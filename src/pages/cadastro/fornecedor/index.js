import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/navbars/header'
import HeaderPerfil from '../../../components/navbars/perfil'
import MenuMobile from '../../../components/menu-mobile';
import HeaderCadastro from '../../../components/navbars/cadastro';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { InputAdornment, TextField } from '@mui/material';
import { AddCircleOutline, Edit, PhoneAndroid, Save, Search } from '@mui/icons-material';
import ButtonComponent from '../../../components/button';
import CentralModal from '../../../components/modal-central';
import { fornecedor } from '../../../utils/json/fornecedor';
import TableComponent from '../../../components/table'
import ModalLateral from '../../../components/modal-lateral'
import { headerFornecedor } from '../../../entities/headers/header-cadastro/header-fornecedor';
import { criarFornecedor } from '../../../services/post/fornecedor';
import CustomToast from '../../../components/toast';
import ArticleIcon from '@mui/icons-material/Article';
import MaskedField from '../../../utils/mascaras/cnpj';
import MaskedFieldPhone from '../../../utils/mascaras/telefone';
import { buscarFornecedor } from '../../../services/get/fornecedores';
import { useNavigate } from 'react-router-dom';
import { deletarFornecedor } from '../../../services/delete/fornecedores';
import { atualizarFornecedor } from '../../../services/put/fornecedor';

const Fornecedor = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editar, setEditar] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [fornecedoresCadastradas, setFornecedoresCadastradas] = useState([]);
  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = (fornecedor) => {
    console.log("Fornecedor selecionado:", fornecedor); // Verifique se os dados estão corretos
    setFornecedorSelecionado(fornecedor);
    setEditar(true);
  };
  const handleCloseModalEditar = () => {
    setEditar(false);
    setFornecedorSelecionado(null); // Limpa o fornecedor selecionado
  };

  const rows = fornecedor.map(categoria => ({
    Nome: categoria.nome,
    CNPJ: categoria.cnpj,
    Telefone: categoria.telefone,
  }));

  const handleFornecedor = async () => {
    try {
      await criarFornecedor(nome, cnpj, telefone); // Enviando os dados para a API
      CustomToast({ type: "success", message: "Setor cadastrado com sucesso!" });
      buscarForncedorCadastradas();
      handleCloseModalCadastro();
      setNome(''); // Limpa o campo de nome
      setCnpj(''); // Limpa o campo de unidade
      setTelefone(''); // Limpa o campo de unidade
    } catch (error) {
      CustomToast({ type: "error", message: "Erro ao cadastrar fornecedor!" });
    }
  };

  const buscarForncedorCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
      return;
    }

    try {
      const response = await buscarFornecedor();
      console.log("Fornecedores cadastrados:", response.data); // Verifique a estrutura dos dados
      setFornecedoresCadastradas(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
        navigate('/');
      } else {
        console.error("Erro ao buscar unidades cadastradas:", error);
      }
    }
  };

  const handleDeletarFornecedor = async (fornecedor) => {
    if (!fornecedor || !fornecedor.id) {
      console.error("Fornecedor não encontrado ou ID não disponível.");
      return;
    }

    const idFornecedor = fornecedor.id;
    console.log("ID do fornecedor a ser deletado:", idFornecedor);

    try {
      await deletarFornecedor(idFornecedor);
      CustomToast({ type: "success", message: "Fornecedor deletado com sucesso!" });
      buscarForncedorCadastradas();
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error.response);
      const errorMessage = error.response?.data?.message || "Erro ao deletar fornecedor.";
      CustomToast({ type: "error", message: errorMessage });
    }
  };

  const handleSalvarEdicao = async () => {
    if (!fornecedorSelecionado) {
      console.error("Nenhum fornecedor selecionado para edição.");
      return;
    }

    try {
      // Chama a função de atualização
      await atualizarFornecedor(
        fornecedorSelecionado.id, // Passa o ID do fornecedor
        fornecedorSelecionado.Nome, // Passa o nome
        fornecedorSelecionado.CNPJ, // Passa o CNPJ
        fornecedorSelecionado.Telefone // Passa o telefone
      );

      // Exibe mensagem de sucesso
      CustomToast({ type: "success", message: "Fornecedor atualizado com sucesso!" });

      // Atualiza a lista de fornecedores
      buscarForncedorCadastradas();

      // Fecha a modal de edição
      handleCloseModalEditar();
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      CustomToast({ type: "error", message: "Erro ao atualizar fornecedor!" });
    }
  };

  useEffect(() => {
    buscarForncedorCadastradas();
  }, []);

  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start   '><PostAddIcon />Cadastro Fornecedor</h1>
        <div className='flex w-full gap-1 mt-9 '>
          <div className="hidden sm:hidden md:block w-[13%]">
            <HeaderCadastro />
          </div>
          <div className="w-[100%] itens-center mt-2 ml-2 sm:mt-0 md:flex md:justify-start flex-col md:w-[80%]">
            <div className="flex gap-2 flex-wrap w-full justify-center md:justify-start">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Buscar Fornecedor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '40%' }, }}
              />
              <ButtonComponent
                startIcon={<Search fontSize='small' />}
                title={'Pesquisar'}
                subtitle={'Pesquisar'}
                buttonSize="large"
              />
              <ButtonComponent
                startIcon={<AddCircleOutline fontSize='small' />}
                title={'Cadastrar'}
                subtitle={'Cadastrar'}
                onClick={handleModalCadastro}
                buttonSize="large"
              />
            </div>

            <div className="w-[90%]">
              <TableComponent
                headers={headerFornecedor}
                rows={fornecedoresCadastradas.map(fornecedor => ({
                  id: fornecedor.id,
                  Nome: fornecedor.nome,
                  CNPJ: fornecedor.cnpj,
                  Telefone: fornecedor.telefone,
                }))}
                actionsLabel={"Ações"}
                actionCalls={{
                  edit: (fornecedor) => handleModalEditar(fornecedor), // Passa o fornecedor selecionado
                  delete: (fornecedor) => handleDeletarFornecedor(fornecedor),
                }}
              />
            </div>

            <CentralModal
              tamanhoTitulo={'81%'}
              maxHeight={'90vh'}
              top={'20%'}
              left={'28%'}
              width={'400px'}
              icon={<AddCircleOutline fontSize="small" />}
              open={cadastro}
              onClose={handleCloseModalCadastro}
              title="Cadastrar Fornecedor"
            >
              <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
                <div className='mt-4 flex gap-3 flex-wrap'>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Nome da Fornecedor"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PostAddIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <MaskedField
                    type="cnpj"
                    label="CNPJ"
                    width={'50%'}
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    icon={<ArticleIcon />}
                    iconSize={30}
                    labelSize="small"
                  />
                  <MaskedFieldPhone
                    type="telefone"
                    label="Telefone"
                    width={'43%'}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    icon={<PhoneAndroid />}
                    iconSize={30}
                    labelSize="small"
                  />
                </div>
                <div className='w-[95%] mt-2 flex items-end justify-end'>
                  <ButtonComponent
                    title={'Cadastrar'}
                    subtitle={'Cadastrar'}
                    startIcon={<Save />}
                    onClick={handleFornecedor} />
                </div>
              </div>
            </CentralModal>

            <ModalLateral
              open={editar}
              handleClose={handleCloseModalEditar}
              tituloModal="Editar Fornecedor"
              icon={<Edit />}
              tamanhoTitulo="75%"
              conteudo={
                <div className="w-full">
                  <div className='mt-4 w-full flex gap-3 flex-wrap'>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Nome da Fornecedor"
                      name="nome"
                      value={fornecedorSelecionado?.Nome || ''} // Use "Nome" em vez de "nome"
                      onChange={(e) => setFornecedorSelecionado({ ...fornecedorSelecionado, Nome: e.target.value })}
                      sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PostAddIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MaskedField
                    type="cnpj"
                    label="CNPJ"
                    width={'95%'}
                    value={fornecedorSelecionado?.CNPJ || ''} // Use "CNPJ" em vez de "cnpj"
                      onChange={(e) => setFornecedorSelecionado({ ...fornecedorSelecionado, CNPJ: e.target.value })}
                    icon={<ArticleIcon />}
                    iconSize={30}
                    labelSize="small"
                  />
                  <MaskedFieldPhone
                    type="telefone"
                    label="Telefone"
                    width={'95%'}
                    value={fornecedorSelecionado?.Telefone || ''} // Use "Telefone" em vez de "telefone"
                      onChange={(e) => setFornecedorSelecionado({ ...fornecedorSelecionado, Telefone: e.target.value })}
                    icon={<PhoneAndroid />}
                    iconSize={30}
                    labelSize="small"
                  />
                   
                  </div>
                  <div className='w-[95%] mt-2 flex items-end justify-end'>
                    <ButtonComponent
                      title={'Salvar'}
                      subtitle={'Salvar'}
                      startIcon={<Save />}
                      onClick={handleSalvarEdicao}
                    />
                  </div>
                </div>
              }
            />
          </div>


        </div>
      </div>
    </div>
  )
}

export default Fornecedor

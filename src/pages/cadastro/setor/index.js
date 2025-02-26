import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbars/header';
import HeaderPerfil from '../../../components/navbars/perfil';
import HeaderCadastro from '../../../components/navbars/cadastro';
import MenuMobile from '../../../components/menu-mobile';
import AppsIcon from '@mui/icons-material/Apps';
import { InputAdornment, TextField } from '@mui/material';
import { AddCircleOutline, Edit, Save, Search } from '@mui/icons-material';
import ButtonComponent from '../../../components/button';
import CentralModal from '../../../components/modal-central';
import ModalLateral from '../../../components/modal-lateral';
import { headerSetor } from '../../../entities/headers/header-cadastro/header-setor';
import { setor } from '../../../utils/json/setor';
import TableComponent from '../../../components/table';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SelectTextFields from '../../../components/select';
import CustomToast from '../../../components/toast';
import { buscarUnidades } from '../../../services/get/unidade';
import { useNavigate } from 'react-router-dom';
import { criarSetor } from '../../../services/post/setor';
import { buscarSetor } from '../../../services/get/setor';
import { deletarSetor } from '../../../services/delete/setor';
import { atualizarSetor } from '../../../services/put/setor';

const Setor = () => {
  const navigate = useNavigate();
  const [editar, setEditar] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const [unidadesCadastradas, setUnidadesCadastradas] = useState([]);
  const [nome, setNome] = useState(''); // Estado para o nome do setor
  const [unidadeId, setUnidadeId] = useState(''); // Estado para o ID da unidade
  const [setoresCadastradas, setSetoresCadastradas] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState(null);
  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);


  const handleModalEditar = (setor) => {
    console.log("Setor sendo editado:", setor);

    // Verifica se setor.unidade_id existe antes de tentar acessá-lo
    const unidadeId = setor.unidade_id !== undefined ? setor.unidade_id.toString() : '';

    setSetorSelecionado({
      ...setor,
      unidadeId: unidadeId // Define o valor de unidadeId como string ou uma string vazia
    });

    setEditar(true);
  };

  const handleCloseModalEditar = () => setEditar(false);

  const rows = setor.map(setor => ({
    Nome: setor.nome,
    unidade_id: setor.unidade_id
  }));

  const buscarUnidadesCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
      return;
    }

    try {
      const response = await buscarUnidades();
      const unidadesFormatadas = response.data.map(unidade => ({
        value: unidade.id.toString(), // Convertendo ID para string
        label: unidade.nome
      }));

      setUnidadesCadastradas(unidadesFormatadas);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
        navigate('/');
      } else {
        console.error("Erro ao buscar unidades cadastradas:", error);
      }
    }
  };

  const handleCadastrar = async () => {
    try {
      await criarSetor(nome, unidadeId); // Enviando os dados para a API
      CustomToast({ type: "success", message: "Setor cadastrado com sucesso!" });
      buscarUnidadesCadastradas();
      handleCloseModalCadastro();
      setNome(''); // Limpa o campo de nome
      setUnidadeId(''); // Limpa o campo de unidade
    } catch (error) {
      CustomToast({ type: "error", message: "Erro ao cadastrar setor!" });
    }
  };

  const handleSalvar = async () => {
    try {
      if (!setorSelecionado) {
        console.error("Nenhum setor selecionado para edição.");
        return;
      }

      const { id, Nome, unidadeId } = setorSelecionado;

      // Verifica se o unidadeId está definido
      if (!unidadeId) {
        console.error("unidadeId não está definido.");
        CustomToast({ type: "error", message: "Selecione uma unidade válida." });
        return;
      }

      // Chama a função para atualizar a categoria
      await atualizarSetor(id, Nome, unidadeId);

      // Exibe uma mensagem de sucesso
      CustomToast({ type: "success", message: "Setor atualizado com sucesso!" });

      // Fecha o modal de edição
      handleCloseModalEditar();

      // Atualiza a lista de setores cadastrados
      buscarSetorCadastradas();
    } catch (error) {
      console.error("Erro ao salvar setor:", error);
      CustomToast({ type: "error", message: "Erro ao atualizar setor!" });
    }
  };
  
  const buscarSetorCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redireciona para a página de login se não houver token
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." }); // Exibe o toast
      return;
    }

    try {
      const response = await buscarSetor(); // Chama a função que busca as cidades
      console.log('Dados setores cadastradas:', response); // Adiciona log para verificar os dados
      setSetoresCadastradas(response.data); // Atualiza o estado com os dados retornados
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." }); // Exibe o toast
        navigate('/'); // Redireciona para a página de login
      } else {
        console.error("Erro ao buscar setores cadastrados:", error);
      }
    }
  };

  const handleDeletarSetor = async (setor) => {
    const idSetor = setor.id;
    try {
      await deletarSetor(idSetor);
      CustomToast({ type: "success", message: "Setor deletada com sucesso!" });
      buscarSetorCadastradas()
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao deletar Setor.";
      CustomToast({ type: "error", message: 'Você não possui permissão para excluir!' });
      console.error('Erro ao deletar Setor:', error);
    }
  };

  useEffect(() => {
    buscarUnidadesCadastradas();
    buscarSetorCadastradas();
  }, []);

  useEffect(() => {
    console.log("Setor selecionado atualizado:", setorSelecionado);
  }, [setorSelecionado]);
  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start'><AppsIcon />Cadastro Setor</h1>
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
                label="Buscar Setor"
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
                headers={headerSetor}
                rows={setoresCadastradas.map(setor => ({
                  id: setor.id,
                  Nome: setor.nome,
                  unidade_id: setor.unidade_id // Inclua o campo unidade_id
                }))}
                actionCalls={{
                  edit: (setor) => handleModalEditar(setor),
                  delete: (setor) => handleDeletarSetor(setor),
                }}
              />

            </div>
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
            title="Cadastrar Setor"
          >
            <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
              <div className='mt-4 flex gap-3 flex-wrap'>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Nome do Setor"
                  name="nome"
                  value={nome} // Vinculando o valor do campo ao estado
                  onChange={(e) => setNome(e.target.value)} // Atualizando o estado
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AppsIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <SelectTextFields
                  width={'150px'}
                  icon={<LocationCityIcon fontSize="small" />}
                  label={'Unidade'}
                  backgroundColor={"#D9D9D9"}
                  fontWeight={500}
                  options={unidadesCadastradas}
                  value={unidadeId} // Vinculando o valor do select ao estado
                  onChange={(e) => setUnidadeId(e.target.value)} // Atualizando o estado
                />
              </div>
              <div className='w-[95%] mt-2 flex items-end justify-end'>
                <ButtonComponent
                  title={'Cadastrar'}
                  subtitle={'Cadastrar'}
                  startIcon={<Save />}
                  onClick={handleCadastrar} // Chamando a função de cadastro
                />
              </div>
            </div>
          </CentralModal>

          <ModalLateral
            open={editar}
            handleClose={handleCloseModalEditar}
            tituloModal="Editar Setor"
            icon={<Edit />}
            tamanhoTitulo="75%"
            conteudo={
              <div className="w-full">
                <div className='mt-4 w-full flex gap-3 flex-wrap'>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Nome do Setor"
                    name="nome"
                    value={setorSelecionado ? setorSelecionado.Nome : ''} // Use 'Nome' com 'N' maiúsculo
                    onChange={(e) => setSetorSelecionado({ ...setorSelecionado, Nome: e.target.value })} // Atualiza o nome do setor
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AppsIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <SelectTextFields
                    width={'290px'}
                    icon={<LocationCityIcon fontSize="small" />}
                    label={'Unidade'}
                    backgroundColor={"#D9D9D9"}
                    fontWeight={500}
                    options={unidadesCadastradas}
                    value={setorSelecionado?.unidadeId || ''} // Já convertido para string
                    onChange={(e) =>
                      setSetorSelecionado((prev) => ({
                        ...prev,
                        unidadeId: e.target.value,
                      }))
                    }
                  />



                </div>
                <div className='w-[95%] mt-2 flex items-end justify-end'>
                  <ButtonComponent
                    title={'Salvar'}
                    subtitle={'Salvar'}
                    startIcon={<Save />}
                    onClick={handleSalvar} // Chama a função handleSalvar ao clicar
                  />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Setor;
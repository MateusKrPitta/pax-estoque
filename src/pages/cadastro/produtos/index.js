import React, { useState, useEffect } from "react";
import Navbar from '../../../components/navbars/header';
import HeaderPerfil from '../../../components/navbars/perfil';
import HeaderCadastro from '../../../components/navbars/cadastro';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MenuMobile from "../../../components/menu-mobile";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { InputAdornment, TextField } from "@mui/material";
import { AddCircleOutline, Category, DocumentScanner, Edit, Save, Search } from "@mui/icons-material";
import ButtonComponent from "../../../components/button";
import CentralModal from "../../../components/modal-central";
import SelectTextFields from '../../../components/select';
import { headerProduto } from "../../../entities/headers/header-cadastro/header-produto";
import { produto } from "../../../utils/json/produto";
import TableComponent from "../../../components/table";
import ModalLateral from "../../../components/modal-lateral";
import { useNavigate } from "react-router-dom";
import { buscarCategoria } from "../../../services/get/categoria";
import CustomToast from "../../../components/toast";
import { buscarFornecedor } from "../../../services/get/fornecedores";
import { criarProduto } from "../../../services/post/produto";
import { buscarProduto } from "../../../services/get/produto";
import { atualizarProduto } from "../../../services/put/produto";
import { deletarProduto } from "../../../services/delete/produto";
const Produtos = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [editar, setEditar] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const [categoriasCadastradas, setCategoriasCadastradas] = useState([]);
  const [fornecedoresCadastradas, setFornecedoresCadastradas] = useState([]);
  const [tiposCategorias, setTiposCategorias] = useState([]);
  const [tiposFornecedores, setTiposFornecedores] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [produtoCadastradas, setUnidadesCadastradas] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = (produto) => {
    console.log("Produto recebido para edição:", produto);
    const categoriaEncontrada = tiposCategorias.find(categoria => categoria.nome === produto.Categoria);
    const fornecedorEncontrado = tiposFornecedores.find(fornecedor => fornecedor.nome === produto.Fornecedor);

    setProdutoSelecionado({
        id: produto.Id, // Use 'Id' em vez de 'id'
        Nome: produto.Nome,
        categoria_id: categoriaEncontrada ? categoriaEncontrada.id : '',
        fornecedor_id: fornecedorEncontrado ? fornecedorEncontrado.id : ''
    });

    setEditar(true);
};
  const handleCloseModalEditar = () => setEditar(false);

  const rows = produto.map(categoria => ({
    id: categoria.id, // Adicione o id aqui
    Nome: categoria.nome,
    Quantidade: categoria.quantidade,
    Fornecedor: categoria.fornecedor,
    Categoria: categoria.categoria,
  }));


  const buscarCategoriaCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
      return;
    }

    try {
      const response = await buscarCategoria();
      console.log('Dados categoria cadastradas:', response.data); // Verifique se o formato está correto
      setCategoriasCadastradas(response.data);
      setTiposCategorias(response.data.map(categoria => ({
        id: categoria.id,
        nome: categoria.nome
      })));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
        navigate('/');
      } else {
        console.error("Erro ao buscar setores cadastrados:", error);
      }
    }
  };

  const buscarProdutos = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
      return;
    }

    try {
      const response = await buscarProduto();
      setUnidadesCadastradas(response.data); // Certifique-se de que response.data contém os produtos
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
    // Verifica se todos os campos necessários estão preenchidos
    if (!nome || !categoriaSelecionada || !fornecedorSelecionado) {
      CustomToast({ type: "error", message: "Por favor, preencha todos os campos!" });
      return;
    }

    // Extraindo os valores necessários
    const produtoNome = nome; // Nome do produto
    const categoriaId = categoriaSelecionada.id; // ID da categoria selecionada
    const fornecedorId = fornecedorSelecionado.id; // ID do fornecedor selecionado

    try {
      // Chamando a função com os parâmetros corretos
      await criarProduto(produtoNome, categoriaId, fornecedorId);
      CustomToast({ type: "success", message: "Produto cadastrado com sucesso!" });
      buscarProdutos();
      handleCloseModalCadastro();
      setNome(''); // Limpa o campo de nome
      setCategoriaSelecionada(''); // Limpa a categoria selecionada
      setFornecedorSelecionado(''); // Limpa o fornecedor selecionado
    } catch (error) {
      // Aqui você pode querer verificar o erro retornado pela API
      if (error.response && error.response.data) {
        const errorMessages = error.response.data;
        console.error("Erro ao cadastrar produto:", errorMessages);
        CustomToast({ type: "error", message: "Erro ao cadastrar produto: " + JSON.stringify(errorMessages) });
      } else {
        CustomToast({ type: "error", message: "Erro ao cadastrar produto!" });
      }

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
      console.log("Fornecedores cadastrados:", response.data);
      setFornecedoresCadastradas(response.data);
      setTiposFornecedores(response.data.map(fornecedor => ({
        id: fornecedor.id,
        nome: fornecedor.nome
      })));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
        navigate('/');
      } else {
        console.error("Erro ao buscar unidades cadastradas:", error);
      }
    }
  };

  const handleAtualizarProduto = async () => {
    if (!produtoSelecionado?.Nome || !produtoSelecionado?.categoria_id || !produtoSelecionado?.fornecedor_id) {
      CustomToast({ type: "error", message: "Por favor, preencha todos os campos!" });
      return;
    }

    console.log("Atualizando produto:", produtoSelecionado); // Adicione este log

    try {
      await atualizarProduto(produtoSelecionado.id, produtoSelecionado.Nome, produtoSelecionado.categoria_id, produtoSelecionado.fornecedor_id);
      CustomToast({ type: "success", message: "Produto atualizado com sucesso!" });

      // Atualizar a lista de produtos
      await buscarProdutos();
      handleCloseModalEditar();
    } catch (error) {
      CustomToast({ type: "error", message: "Erro ao atualizar o produto!" });
    }
  };
  const handleDeletarProduto = async (setor) => {
    const idSetor = setor.id;
    try {
      await deletarProduto(idSetor);
      CustomToast({ type: "success", message: "Produto deletado com sucesso!" });
      buscarProdutos()
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao deletar Produto.";
      CustomToast({ type: "error", message: 'Você não possui permissão para excluir!' });
      console.error('Erro ao deletar Produto:', error);
    }
  };


  useEffect(() => {
    buscarProdutos();
    buscarCategoriaCadastradas();
    buscarForncedorCadastradas();
  }, []);

  useEffect(() => {
    console.log('Produtos cadastrados:', produtoCadastradas); // Verifique se os produtos estão sendo carregados
  }, [produtoCadastradas]);

  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start'>
          <AddShoppingCartIcon />Cadastro Produtos
        </h1>
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
                label="Buscar Produto"
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
                headers={headerProduto}
                rows={produtoCadastradas.map(produto => ({
                  Id: produto.id,
                  Nome: produto.nome,
                  Quantidade: produto.quantidade,
                  Fornecedor: produto.fornecedor,
                  Categoria: produto.categoria,
                }))}
                actionsLabel={"Ações"}
                actionCalls={{
                  edit: (produto) => handleModalEditar(produto), // Certifique-se de que 'produto' está correto aqui
                  delete: (produto) => handleDeletarProduto(produto),
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
              title="Cadastrar Produtos"
            >
              <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
                <div className='mt-4 flex gap-3 flex-wrap'>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Nome do Produto"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DocumentScanner />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <SelectTextFields
                    width={'150px'}
                    icon={<Category fontSize="small" />}
                    label={'Categoria'}
                    backgroundColor={"#D9D9D9"}
                    fontWeight={500}
                    options={tiposCategorias.map(categoria => ({
                      value: categoria.id, // Use 'value' para o id
                      label: categoria.nome // Use 'label' para o nome
                    }))}
                    value={categoriaSelecionada?.id || ''} // Passando o id como valor
                    onChange={(e) => {
                      const selected = tiposCategorias.find(categoria => categoria.id === e.target.value);
                      setCategoriaSelecionada(selected); // Salvando o objeto completo
                    }}
                  />

                  <SelectTextFields
                    width={'175px'}
                    icon={<PostAddIcon fontSize="small" />}
                    label={'Fornecedor'}
                    backgroundColor={"#D9D9D9"}
                    fontWeight={500}
                    options={tiposFornecedores.map(fornecedor => ({
                      value: fornecedor.id, // Use 'value' para o id
                      label: fornecedor.nome // Use 'label' para o nome
                    }))}
                    value={fornecedorSelecionado?.id || ''} // Passando o id como valor
                    onChange={(e) => {
                      const selected = tiposFornecedores.find(fornecedor => fornecedor.id === e.target.value);
                      setFornecedorSelecionado(selected); // Salvando o objeto completo
                    }}
                  />

                </div>
                <div className='w-[95%] mt-2 flex items-end justify-end'>
                  <ButtonComponent
                    title={'Cadastrar'}
                    subtitle={'Cadastrar'}
                    startIcon={<Save />}
                    onClick={handleCadastrar}
                  />
                </div>
              </div>
            </CentralModal>

            <ModalLateral
              open={editar}
              handleClose={handleCloseModalEditar}
              tituloModal="Editar Produto"
              icon={<Edit />}
              tamanhoTitulo="75%"
              conteudo={
                <div className="w-full">
                  <div className='mt-4 w-full flex gap-3 flex-wrap'>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Nome do Produto"
                      name="nome"
                      value={produtoSelecionado?.Nome || ''} // Use "Nome" em vez de "nome"
                      onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, Nome: e.target.value })}
                      sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '98%' } }}
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DocumentScanner />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <SelectTextFields
                      width={'295px'}
                      icon={<Category fontSize="small" />}
                      label={'Categoria'}
                      backgroundColor={"#D9D9D9"}
                      fontWeight={500}
                      options={tiposCategorias.map(categoria => ({
                        value: categoria.id,
                        label: categoria.nome
                      }))}
                      value={produtoSelecionado?.categoria_id || ''}
                      onChange={(e) => {
                        const selected = tiposCategorias.find(categoria => categoria.id === e.target.value);
                        setProdutoSelecionado({ ...produtoSelecionado, categoria_id: selected?.id });
                      }}
                    />

                    <SelectTextFields
                      width={'295px'}
                      icon={<PostAddIcon fontSize="small" />}
                      label={'Fornecedor'}
                      backgroundColor={"#D9D9D9"}
                      fontWeight={500}
                      options={tiposFornecedores.map(fornecedor => ({
                        value: fornecedor.id,
                        label: fornecedor.nome
                      }))}
                      value={produtoSelecionado?.fornecedor_id || ''}
                      onChange={(e) => {
                        const selected = tiposFornecedores.find(fornecedor => fornecedor.id === e.target.value);
                        setProdutoSelecionado({ ...produtoSelecionado, fornecedor_id: selected?.id });
                      }}
                    />

                  </div>
                  <div className='w-[95%] mt-2 flex items-end justify-end'>
                    <ButtonComponent
                      title={'Salvar'}
                      subtitle={'Salvar'}
                      startIcon={<Save />}
                      onClick={handleAtualizarProduto}
                    />

                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
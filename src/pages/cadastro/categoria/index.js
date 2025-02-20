import React, { useState, useEffect } from "react";
import Navbar from '../../../components/navbars/header'
import HeaderPerfil from '../../../components/navbars/perfil'
import HeaderCadastro from '../../../components/navbars/cadastro';

import MenuMobile from "../../../components/menu-mobile";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { InputAdornment, TextField } from "@mui/material";
import { AddCircleOutline, Category, CategoryOutlined, Edit, Save, Search } from "@mui/icons-material";
import ButtonComponent from "../../../components/button";
import TableComponent from "../../../components/table";
import CentralModal from "../../../components/modal-central";
import { headerCategoria } from "../../../entities/headers/header-cadastro/header-categoria";
import { categoria } from "../../../utils/json/categoria";
import ModalLateral from "../../../components/modal-lateral";
import { criarCategoria } from "../../../services/post/categoria";
import CustomToast from "../../../components/toast";
import { deletarCategoria } from "../../../services/delete/categoria";
import { buscarCategoria } from "../../../services/get/categoria";
import { useNavigate } from "react-router-dom";
import { atualizarCategoria } from "../../../services/put/categoria";

const Categoria = () => {
  const navigate = useNavigate();
  const [editar, setEditar] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const [nome, setNome] = useState(''); // Estado para o nome do setor
  const [categoriasCadastradas, setCategoriasCadastradas] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');


  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = (categoria) => {
    setCategoriaSelecionada(categoria); // Armazena a categoria selecionada
    setEditar(true);
  };
  const handleCloseModalEditar = () => setEditar(false);

  const rows = categoria.map(categoria => ({
    Nome: categoria.nome,
  }));

  const handleCadastrar = async () => {
    try {
      await criarCategoria(nome); // Enviando os dados para a API
      CustomToast({ type: "success", message: "Setor cadastrado com sucesso!" });
      buscarCategoriaCadastradas();
      handleCloseModalCadastro();
      setNome(''); // Limpa o campo de nome
    } catch (error) {
      CustomToast({ type: "error", message: "Erro ao cadastrar categoria!" });
    }
  };

  const buscarCategoriaCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redireciona para a página de login se não houver token
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." }); // Exibe o toast
      return;
    }

    try {
      const response = await buscarCategoria(); // Chama a função que busca as cidades
      console.log('Dados categoria cadastradas:', response); // Adiciona log para verificar os dados
      setCategoriasCadastradas(response.data); // Atualiza o estado com os dados retornados
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." }); // Exibe o toast
        navigate('/'); // Redireciona para a página de login
      } else {
        console.error("Erro ao buscar setores cadastrados:", error);
      }
    }
  };

  const handleDeletarCategoria = async (categoria) => {
    const idCategoria = categoria.id;
    try {
      await deletarCategoria(idCategoria);
      CustomToast({ type: "success", message: "Cidade deletada com sucesso!" });
      buscarCategoriaCadastradas();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao deletar cidade.";
      CustomToast({ type: "error", message: 'Você não possui permissão para excluir!' });
      console.error('Erro ao deletar cidade:', error);
    }
  };

  const handleAtualizar = async () => {
    if (!categoriaSelecionada || !categoriaSelecionada.id) {
      CustomToast({ type: "error", message: "Categoria inválida!" });
      return;
    }

    try {
      await atualizarCategoria(categoriaSelecionada.id, categoriaSelecionada.Nome);
      CustomToast({ type: "success", message: "Categoria atualizada com sucesso!" });
      buscarCategoriaCadastradas(); // Atualiza a lista de categorias
      handleCloseModalEditar(); // Fecha a modal
    } catch (error) {
      CustomToast({ type: "error", message: "Erro ao atualizar categoria!" });
    }
  };


  useEffect(() => {
    buscarCategoriaCadastradas();
  }, []);
  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start   '><AssignmentIcon />Cadastro Categoria</h1>
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
                label="Buscar Categoria"
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
                headers={headerCategoria}
                rows={categoriasCadastradas.map(categoria => ({
                  id: categoria.id,
                  Nome: categoria.nome,
                }))}
                actionCalls={{
                  edit: (categoria) => handleModalEditar(categoria),
                  delete: (categoria) => handleDeletarCategoria(categoria),
                }}
              />
            </div>
          </div>
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
        title="Cadastrar Categoria"
      >
        <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
          <div className='mt-4 flex gap-3 flex-wrap'>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Nome da Categoria"
              name="nome"
              value={nome} // Vinculando o valor do campo ao estado
              onChange={(e) => setNome(e.target.value)}
              sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryOutlined />
                  </InputAdornment>
                ),
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
        tituloModal="Editar Categoria"
        icon={<Edit />}
        tamanhoTitulo="75%"
        conteudo={
          <div className="w-full">
            <div className='mt-4 w-full flex gap-3 flex-wrap'>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Nome da Categoria"
                name="nome"
                value={categoriaSelecionada ? categoriaSelecionada.Nome : ''} // Exibe o nome corretamente
                onChange={(e) =>
                  setCategoriaSelecionada({ ...categoriaSelecionada, Nome: e.target.value })
                }
                sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryOutlined />
                    </InputAdornment>
                  ),
                }}
              />


            </div>
            <div className='w-[95%] mt-2 flex items-end justify-end'>
              <ButtonComponent
                title={'Salvar'}
                subtitle={'Salvar'}
                startIcon={<Save />}
                onClick={handleAtualizar} />
            </div>
          </div>
        }
      />
    </div>
  )
}

export default Categoria
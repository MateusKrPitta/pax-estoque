import React, { useState } from 'react'
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

const Fornecedor = () => {
  const [editar, setEditar] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = () => setEditar(true);
  const handleCloseModalEditar = () => setEditar(false);

  const rows = fornecedor.map(categoria => ({
    Nome: categoria.nome,
    CNPJ: categoria.cnpj,
    Telefone: categoria.telefone,
  }));
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
                rows={rows} // Passando rows para o TableComponent
                actionsLabel={"Ações"} // Se você quiser adicionar ações
                actionCalls={{
                  edit: handleModalEditar,
                  delete: ''
                  // Aqui você pode adicionar ações como editar ou deletar
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
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="CNPJ"
                    name="nome"
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PostAddIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Telefone"
                    name="nome"
                    sx={{ width: { xs: '95%', sm: '50%', md: '47%', lg: '42%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroid />
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
                  />
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
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="CNPJ"
                    name="nome"
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PostAddIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Telefone"
                    name="nome"
                    sx={{ width: { xs: '95%', sm: '50%', md: '47%', lg: '42%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroid />
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

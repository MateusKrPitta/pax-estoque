import React, { useState } from 'react'
import Navbar from '../../../components/navbars/header'
import HeaderPerfil from '../../../components/navbars/perfil'
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
import TableComponent from '../../../components/table'
const Setor = () => {
  const [editar, setEditar] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = () => setEditar(true);
  const handleCloseModalEditar = () => setEditar(false);

  const rows = setor.map(setor => ({
    Nome: setor.nome,
  }));
  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start   '><AppsIcon />Cadastro Setor</h1>
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
                rows={rows} // Passando rows para o TableComponent
                actionsLabel={"Ações"} // Se você quiser adicionar ações
                actionCalls={{
                  edit: handleModalEditar,
                  delete: ''
                  // Aqui você pode adicionar ações como editar ou deletar
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
  )
}

export default Setor
import React, { useState } from "react";
import Navbar from '../../../components/navbars/header'
import HeaderPerfil from '../../../components/navbars/perfil'
import { AddCircleOutline, Edit, LocationOnOutlined, PhoneAndroid, Save, Search } from "@mui/icons-material";
import MenuMobile from "../../../components/menu-mobile";
import HeaderCadastro from "../../../components/navbars/cadastro";
import { InputAdornment, TextField } from "@mui/material";
import ButtonComponent from "../../../components/button";
import TableComponent from "../../../components/table";
import { headerUnidade } from "../../../entities/headers/header-cadastro/header-unidade";
import { unidade } from "../../../utils/json/unidades";
import CentralModal from "../../../components/modal-central";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ArticleIcon from '@mui/icons-material/Article';
import ModalLateral from "../../../components/modal-lateral";
const Unidades = () => {
  const [cadastro, setCadastro] = useState(false);
  const [editar, setEditar] = useState(false);
  const rows = unidade.map(usuario => ({
    Nome: usuario.nome,
    Cnpj: usuario.cnpj,
    Telefone: usuario.telefone,
    Cidade: usuario.cidade,
    Endereco: usuario.endereco,
  }));

  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = () => setEditar(true);
  const handleCloseModalEditar = () => setEditar(false);

  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start   '><LocationOnOutlined />Cadastro Unidades</h1>
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
                label="Buscar Usuário"
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
                startIcon={<AddCircleOutline fontSize='small' />}
                title={'Cadastrar'}
                subtitle={'Cadastrar'}
                onClick={handleModalCadastro}
                buttonSize="large"
              />
            </div>
            <div className="w-[90%]">
              <TableComponent
                headers={headerUnidade}
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
              width={'600px'}
              icon={<AddCircleOutline fontSize="small" />}
              open={cadastro}
              onClose={handleCloseModalCadastro}
              title="Cadastrar Unidade"
            >
              <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
                <div className='mt-4 flex gap-3 flex-wrap'>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Nome da Unidade"
                    name="nome"
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssuredWorkloadIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Cidade"
                    name="cidade"
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '42%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="CNPJ"
                    name="cnpj"
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ArticleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Telefone"
                    name="telefone"
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '42%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroid />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Endereço"
                    name="endereco"
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeWorkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className='w-[95%] mt-2 flex items-end justify-end'>
                    <ButtonComponent
                      title={'Cadastrar'}
                      subtitle={'Cadastrar'}
                      startIcon={<Save />}
                    />
                  </div>
                </div>
              </div>
            </CentralModal>


            <ModalLateral
              open={editar}
              handleClose={handleCloseModalEditar}
              tituloModal="Editar Unidade"
              icon={<Edit />}
              tamanhoTitulo="75%"
              conteudo={
                <div className="">
                  <div className='mt-4 flex gap-3 flex-wrap'>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Nome da Unidade"
                      name="nome"
                      sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssuredWorkloadIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Cidade"
                      name="cidade"
                      sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '42%' } }}
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="CNPJ"
                      name="cnpj"
                      sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArticleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Telefone"
                      name="telefone"
                      sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '42%' } }}
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneAndroid />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Endereço"
                      name="endereco"
                      sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
                      autoComplete="off"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeWorkIcon />
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

export default Unidades
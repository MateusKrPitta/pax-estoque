import React, { useState } from "react";
import MenuMobile from '../../components/menu-mobile'
import Navbar from '../../components/navbars/header'
import HeaderPerfil from '../../components/navbars/perfil'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { InputAdornment, TextField } from '@mui/material';
import { AddCircleOutline, Edit, Numbers, ProductionQuantityLimits, Save, Search, WorkHistory } from '@mui/icons-material';
import ButtonComponent from '../../components/button';
import TableComponent from '../../components/table';
import CentralModal from '../../components/modal-central';
import { headerEstoque } from "../../entities/headers/header-cadastro/header-estoque";
import SelectTextFields from "../../components/select";
import { estoque } from "../../utils/json/estoque";
import ModalLateral from "../../components/modal-lateral";

const Estoque = () => {
  const [editar, setEditar] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = () => setEditar(true);
  const handleCloseModalEditar = () => setEditar(false);

  const rows = estoque.map(estoque => ({
    Produto: estoque.nome,
    Setor: estoque.setor,
    Quantidade: estoque.quantidade,
    QuantidadeMinima: estoque.quantidadeMinima,
  }));
  return (
    <div className="md:flex w-[100%] h-[100%]">
      <MenuMobile />
      <Navbar />

      <div className='flex flex-col gap-2 w-full items-end'>
        <HeaderPerfil />

        <h1 className='ml-3 text-2xl font-bold text-primary w-[98%] flex gap-2 items-center  '><Inventory2Icon />Estoque</h1>
        <div className="w-[100%] itens-center   sm:mt-10 flex mjustify-start flex-col ">
          <div className="flex w-[90%] gap-2 flex-wrap  justify-center md:justify-start ml-3">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Buscar Estoque"
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
          <div className="w-[90%] ml-3">
            <TableComponent
              headers={headerEstoque}
              rows={rows}
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
            width={'450px'}
            icon={<AddCircleOutline fontSize="small" />}
            open={cadastro}
            onClose={handleCloseModalCadastro}
            title="Cadastrar Estoque"
          >
            <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
              <div className='mt-4 flex gap-3 flex-wrap'>
                <SelectTextFields
                  width={'190px'}
                  icon={<ProductionQuantityLimits fontSize="small" />}
                  label={'Nome do Produto'}
                  backgroundColor={"#D9D9D9"}
                  fontWeight={500}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Quantidade"
                  name="nome"
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '45%' } }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers />
                      </InputAdornment>
                    ),
                  }}
                />
                <SelectTextFields
                  width={'190px'}
                  icon={<WorkHistory fontSize="small" />}
                  label={'Setor'}
                  backgroundColor={"#D9D9D9"}
                  fontWeight={500}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Quantidade Mínima "
                  name="nome"
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '45%' } }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers />
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
            tituloModal="Editar Estoque"
            icon={<Edit />}
            tamanhoTitulo="75%"
            conteudo={
              <div className="w-full">
                <div className='mt-4 w-full flex gap-3 flex-wrap'>
                <SelectTextFields
                  width={'155px'}
                  icon={<ProductionQuantityLimits fontSize="small" />}
                  label={'Nome do Produto'}
                  backgroundColor={"#D9D9D9"}
                  fontWeight={500}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Quantidade"
                  name="nome"
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '45%' } }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers />
                      </InputAdornment>
                    ),
                  }}
                />
                <SelectTextFields
                  width={'155px'}
                  icon={<WorkHistory fontSize="small" />}
                  label={'Setor'}
                  backgroundColor={"#D9D9D9"}
                  fontWeight={500}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Quantidade Mínima "
                  name="nome"
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '45%' } }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers />
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

export default Estoque
import React, { useState } from "react";
import MenuMobile from '../../components/menu-mobile'
import Navbar from '../../components/navbars/header'
import HeaderPerfil from '../../components/navbars/perfil'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { InputAdornment, TextField } from '@mui/material';
import { AddCircleOutline, Numbers, Person, ProductionQuantityLimits, Save, Search } from '@mui/icons-material';
import ButtonComponent from '../../components/button';
import TableComponent from '../../components/table';
import {entrada} from '../../utils/json/entrada'
import { headerEntrada } from '../../entities/headers/header-cadastro/header-entrada';
import CentralModal from "../../components/modal-central";
const Entradas = () => {
  const [cadastro, setCadastro] = useState(false);
  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);


  const rows = entrada.map(entrada => ({
    Produto: entrada.nome,
    Quantidade: entrada.quantidade,
    Solicitado: entrada.solicitado,
  }));

  return (
    <div className="md:flex w-[100%] h-[100%]">
      <MenuMobile />
      <Navbar />

      <div className='flex flex-col gap-2 w-full items-end'>
        <HeaderPerfil />

        <h1 className='ml-3 text-2xl font-bold text-primary w-[98%] flex gap-2 items-center  '><AutoAwesomeMotionIcon />Entradas</h1>
        <div className="w-[100%] itens-center   sm:mt-10 flex mjustify-start flex-col ">
          <div className="flex w-[90%] gap-2 flex-wrap  justify-center md:justify-start ml-3">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Buscar Entrada"
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
              headers={headerEntrada}
              rows={rows}

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
            title="Cadastrar Entrada"
          >
            <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
              <div className='mt-4 flex gap-3 flex-wrap'>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Nome do Produto"
                  name="nome"
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ProductionQuantityLimits />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Solicitado por"
                  name="nome"
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '42%' } }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Quantidade"
                  name="nome"
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
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


        </div>
      </div>
    </div>
  )
}

export default Entradas
import React, { useState } from "react";
import Navbar from '../../../components/navbars/header'
import HeaderPerfil from '../../../components/navbars/perfil'
import HeaderCadastro from '../../../components/navbars/cadastro';

import MenuMobile from "../../../components/menu-mobile";
import AssignmentIcon from '@mui/icons-material/Assignment';


const Categoria = () => {

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

         
        </div>
      </div>
    </div>
  )
}

export default Categoria
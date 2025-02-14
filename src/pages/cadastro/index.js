import React from 'react'
import Navbar from '../../components/navbars/header'
import HeaderPerfil from '../../components/navbars/perfil'
import HeaderCadastro from '../../components/navbars/cadastro'
import Dashboard from '../../assets/png/cadastro.png'
import MenuMobile from '../../components/menu-mobile'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

const Cadastro = () => {
    return (
        <div className="flex gap-3 ">
            <Navbar />
            <div className='flex flex-col gap-2 w-full items-end'>
                <MenuMobile />
                <HeaderPerfil />
                <h1 className='flex justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start   '><MiscellaneousServicesIcon/>Cadastro</h1>
                <div className=" items-center w-full flex mt-[40px] gap-2 flex-wrap md:items-start">
                    <div className='w-[100%] md:w-[11.5%]'>
                    <HeaderCadastro />
                    </div>
                   
                    <div className='w-[100%] md:w-[80%] flex-col flex items-center justify-center'>
                        <img className='w-[40%]' src={Dashboard}></img>
                        <h1 className='font-bold '>Selecione uma opção do menu!</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cadastro
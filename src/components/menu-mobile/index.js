import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logoPaxVerde from '../../assets/svg/logos/logo-pax-branco.svg';
import { useNavigate } from 'react-router-dom';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from "@mui/icons-material/Menu";
import PostAddIcon from '@mui/icons-material/PostAdd';
import GradingIcon from '@mui/icons-material/Grading';
import ArticleIcon from '@mui/icons-material/Article';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { ExitToApp } from '@mui/icons-material';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import LogoutIcon from '@mui/icons-material/Logout';
const MenuMobile = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (route) => {
        navigate(route);
        handleClose(); // Fecha o menu após a navegação
    };

    return (
        <div className='w-[100%] sm:hidden flex items-center p-3 justify-center z-30 md:hidden lg:hidden' style={{ backgroundColor: '#006b33' }}>
            <div className="flex justify-center cursor-pointer w-[85%]" onClick={() => handleNavigate("/dashboard")}>
                <img src={logoPaxVerde} alt="Logo" title={user ? "Clique para acessar a Dashboard" : ''} className="w-24" />
            </div>
            <button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ backgroundColor: '#ffff', color: '#006b33', borderRadius: '5px', width: '10%' }}
            >
                <MenuIcon fontSize='small' />
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleNavigate("/dashboard")} style={{ color: '#006b33', gap: '8px', display: 'flex', alignItems: 'center', fontWeight: '600', fontSize: '12px' }}>
                    <DashboardIcon fontSize='small' />Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/entradas")} style={{ color: '#006b33', gap: '8px', display: 'flex', alignItems: 'center', fontWeight: '600', fontSize: '12px' }}>
                    <AutoAwesomeMotionIcon fontSize='small' />Entradas
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/saidas")} style={{ color: '#006b33', gap: '8px', display: 'flex', alignItems: 'center', fontWeight: '600', fontSize: '12px' }}>
                    <LogoutIcon fontSize='small' />Saídas
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/novo-contrato")} style={{ color: '#006b33', gap: '8px', display: 'flex', alignItems: 'center', fontWeight: '600', fontSize: '12px' }}>
                    <Inventory2Icon fontSize='small' />Estoque
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/cadastro")} style={{ color: '#006b33', gap: '8px', display: 'flex', alignItems: 'center', fontWeight: '600', fontSize: '12px' }}>
                    <MiscellaneousServicesIcon fontSize='small' />Cadastro
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/sair")} style={{ color: '#006b33', gap: '8px', display: 'flex', alignItems: 'center', fontWeight: '600', fontSize: '12px' }}>
                    <ExitToApp fontSize='small' />Sair
                </MenuItem>
            </Menu>
        </div>
    );
}

export default MenuMobile;
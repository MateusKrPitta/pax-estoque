import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPaxVerde from '../../../assets/svg/logos/logo-pax-branco.svg';
import bgFundo from '../../../assets/bg-sidebar.webp';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CloseIcon from "@mui/icons-material/Close";
import BarChartIcon from '@mui/icons-material/BarChart';
import { Button, Drawer, IconButton, List } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ArticleIcon from '@mui/icons-material/Article';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
const Navbar = ({ user }) => {
    const [activeRoute, setActiveRoute] = useState("");
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showCadastroSubMenu, setShowCadastroSubMenu] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleNavigate = (route) => {
        navigate(route);
        sessionStorage.setItem("page", route);
        setActiveRoute(route);
        if (route === '/cadastro') {
            sessionStorage.setItem("page-cadastro", route);
        }
    };

    useEffect(() => {
        const savedPage = sessionStorage.getItem("page");
        if (savedPage && savedPage !== activeRoute) {
            setActiveRoute(savedPage);
        }
    }, []);

    return (
        <div className='hidden sm:hidden md:block lg:block'>
            <div className="lg:block hidden">
                <div className={`transition-all w-64 h-screen bg-cover bg-no-repeat bg-center flex flex-col p-5`} style={{ backgroundImage: `url(${bgFundo})` }}>
                    <div className="flex justify-center mb-5 cursor-pointer" onClick={() => handleNavigate("/dashboard")}>
                        <img src={logoPaxVerde} alt="Logo" title={user ? "Clique para acessar a Dashboard" : ''} className="w-24" />
                    </div>
                    {/* {user ? ( */}
                    <div className="flex flex-col gap-2 text-white overflow-hidden transition-all">
                        <label className="text-sm mt-1">Home</label>
                        <button
                            onClick={() => handleNavigate("/dashboard")}
                            className={`flex items-center bg-white bg-opacity-20 rounded p-3 px-2 py-2 gap-2 text-sm font-medium ${activeRoute === "/dashboard" ? "border-b-2 border-yellow-300" : ""}`}
                            title={'Dashboard'}
                        >
                            <DashboardIcon fontSize={"small"} />
                            <span>Dashboard</span>
                        </button>
                        <label className="text-sm mt-1">Funções</label>
                        <button
                            onClick={() => handleNavigate("/entradas")}
                            className={`flex items-center bg-white bg-opacity-20 rounded p-3 px-2 py-2 gap-2 text-sm font-medium ${activeRoute === "/entradas" ? "border-b-2 border-yellow-300" : ""}`}
                            title={'Entradas'}
                        >
                            <AutoAwesomeMotionIcon fontSize={"small"} />
                            <span>Entradas</span>
                        </button>
                        <button
                            onClick={() => handleNavigate("/saidas")}
                            className={`flex items-center bg-white bg-opacity-20 rounded p-3 px-2 py-2 gap-2 text-sm font-medium ${activeRoute === "/saidas" ? "border-b-2 border-yellow-300" : ""}`}
                            title={'Saídas'}
                        >
                            <LogoutIcon fontSize={"small"} />
                            <span>Saídas</span>
                        </button>
                        <button
                            onClick={() => handleNavigate("/estoque")}
                            className={`flex items-center bg-white bg-opacity-20 rounded p-3 px-2 py-2 gap-2 text-sm font-medium ${activeRoute === "/estoque" ? "border-b-2 border-yellow-300" : ""}`}
                            title={'Estoque'}
                        >
                            <Inventory2Icon fontSize={"small"} />
                            <span>Estoque</span>
                        </button>
                        <label className="text-sm mt-1">Configurações</label>
                        <button
                            onClick={() => handleNavigate("/cadastro")}
                            className={`flex items-center bg-white bg-opacity-20 rounded p-3 px-2 py-2 gap-2 text-sm font-medium ${activeRoute === "/cadastro" ? "border-b-2 border-yellow-300" : ""}`}
                            title={'Cadastro de Configurações'}
                        >
                            <MiscellaneousServicesIcon fontSize={"small"} />
                            <span>Cadastro</span>
                        </button>
                    </div>
                    {/* ) : null} */}
                </div>
            </div>

            <div className="lg:hidden flex w-full h-[50px] bg-primary fixed top-0 left-0 z-10">
                {user ?
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <IconButton onClick={toggleMenu} style={{ color: "white" }}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                    : <></>
                }
                <div className="flex justify-center items-center w-full h-full">
                    <img
                        src={logoPaxVerde}
                        alt="Logo"
                        title="Clique para acessar a Dashboard"
                        className="w-20"
                    />
                </div>
                <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
                    <div className="w-64">
                        <div className="flex justify-between items-center px-4 py-2 border-b">
                            <h2 className="text-lg font-bold">Menu</h2>
                            <IconButton onClick={toggleMenu}>
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <List>
                            <Button
                                fullWidth
                                onClick={() => handleNavigate("/dashboard")}
                                startIcon={<DashboardIcon fontSize="small" />}
                                className="text-left"
                                title="Ir para Pagamentos"
                                sx={{
                                    justifyContent: "flex-start",
                                    padding: "10px 16px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#f4f4f4",
                                    },
                                }}
                            >
                                Pagamentos
                            </Button>
                            <div>
                                <Button
                                    fullWidth
                                    onClick={() => setShowCadastroSubMenu(!showCadastroSubMenu)}
                                    startIcon={<MiscellaneousServicesIcon fontSize="small" />}
                                    className="text-left"
                                    title="Ir para Cadastro"
                                    sx={{
                                        justifyContent: "flex-start",
                                        padding: "10px 16px",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#f4f4f4",
                                        },
                                    }}
                                >
                                    Cadastro
                                </Button>
                                {showCadastroSubMenu && (
                                    <div>
                                        <Button
                                            fullWidth
                                            onClick={() => handleNavigate("/cadastro")}
                                            startIcon={<PersonIcon fontSize="small" />}
                                            className="text-left"
                                            title="Ir para Usuário"
                                            sx={{
                                                justifyContent: "flex-start",
                                                padding: "10px 50px",
                                                textTransform: "none",
                                                "&:hover": {
                                                    backgroundColor: "#f4f4f4",
                                                },
                                            }}
                                        >
                                            Usuário
                                        </Button>
                                        <Button
                                            fullWidth
                                            onClick={() => handleNavigate("/cadastro-unidade")}
                                            startIcon={<LocationCityIcon fontSize="small" />}
                                            className="text-left"
                                            title="Ir para Unidade"
                                            sx={{
                                                justifyContent: "flex-start",
                                                padding: "10px 50px",
                                                textTransform: "none",
                                                "&:hover": {
                                                    backgroundColor: "#f4f4f4",
                                                },
                                            }}
                                        >
                                            Unidade
                                        </Button>
                                    </div>
                                )}
                                <Button
                                    fullWidth
                                    onClick={() => handleNavigate("/relatorio")}
                                    startIcon={<BarChartIcon fontSize="small" />}
                                    className="text-left"
                                    title="Ir para Relatorio"
                                    sx={{
                                        justifyContent: "flex-start",
                                        padding: "10px 16px",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#f4f4f4",
                                        },
                                    }}
                                >
                                    Relatório
                                </Button>
                            </div>
                        </List>
                    </div>
                </Drawer>
            </div>

        </div>
    );
};

export default Navbar;

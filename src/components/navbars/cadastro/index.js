import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ButtonComponent from '../../button';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AppsIcon from '@mui/icons-material/Apps';
import PetsIcon from '@mui/icons-material/Pets';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const HeaderCadastro = () => {
    const navigate = useNavigate();

    const handleNavigation = (section) => {
        switch (section) {
            case 'usuarios': // Aqui estava 'usuario', mas o botão chama 'usuarios'
                navigate('/cadastro/usuarios');
                break;
            case 'unidades':
                navigate('/cadastro/unidades');
                break;
            case 'categoria':
                navigate('/cadastro/categoria');
                break;
            case 'fornecedor':
                navigate('/cadastro/fornecedor');
                break;
            case 'produtos':
                navigate('/cadastro/produtos');
                break;
            case 'setor':
                navigate('/cadastro/setor');
                break;
           
            default:
                console.warn(`Seção desconhecida: ${section}`);
                break;
        }
    };
    

    return (
        <div className="w-[100%] items-center justify-center flex flex-wrap  sm:justify-start md:w-[100%] gap-1 ">
            <ButtonComponent
                startIcon={<AccountCircleIcon fontSize="small" />}
                title="Usuário"
                buttonSize="large"
                onClick={() => handleNavigation('usuarios')}
                className="w-[35%] sm:w-[50%] md:w-[100%]"

            />
            <ButtonComponent
                startIcon={<LocationOnIcon fontSize="small" />}
                title="Unidades"
                buttonSize="large"
                onClick={() => handleNavigation('unidades')}
                className="w-[35%] sm:w-[50%] md:w-[100%]"

            />
            <ButtonComponent
                startIcon={<AssignmentIcon fontSize="small" />}
                title="Categoria"
                buttonSize="large"
                onClick={() => handleNavigation('categoria')}
                className="w-[35%] sm:w-[50%] md:w-[100%]"

            />
            <ButtonComponent
                startIcon={<PostAddIcon fontSize="small" />}
                title="Fornecedor"
                buttonSize="large"
                onClick={() => handleNavigation('fornecedor')}
                className="w-[35%] sm:w-[50%] md:w-[100%]"

            />
            <ButtonComponent
                startIcon={<AddShoppingCartIcon fontSize="small" />}
                title="Produtos"
                buttonSize="large"
                onClick={() => handleNavigation('produtos')}
                className="w-[35%] sm:w-[50%] md:w-[100%]"

            />
            <ButtonComponent
                startIcon={<AppsIcon fontSize="small" />}
                title="Setor"
                buttonSize="large"
                onClick={() => handleNavigation('setor')}
                className="w-[35%] sm:w-[50%] md:w-[100%]"

            />
           
        </div>
    );
};

export default HeaderCadastro;

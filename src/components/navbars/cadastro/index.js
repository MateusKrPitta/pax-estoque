import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ButtonComponent from '../../button';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AppsIcon from '@mui/icons-material/Apps';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocationCityIcon from '@mui/icons-material/LocationCity';
const HeaderCadastro = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('');

    const handleNavigation = (section) => {
        setActiveSection(section); // Atualiza a seção ativa
        switch (section) {
            case 'usuarios':
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
            case 'cidade':
                navigate('/cadastro/cidade');
                break;
            default:
                console.warn(`Seção desconhecida: ${section}`);
                break;
        }
    };

    return (
        <div className="w-[100%] items-center justify-center flex flex-wrap sm:justify-start md:w-[100%] gap-1">
            <ButtonComponent
                startIcon={<AccountCircleIcon fontSize="small" />}
                title="Usuário"
                buttonSize="large"
                onClick={() => handleNavigation('usuarios')}
                isActive={activeSection === 'usuarios'} // Passa a propriedade isActive
                className={`w-[35%] sm:w-[50%] md:w-[100%] ${activeSection === 'usuarios' ? 'bg-[#006b33] text-white' : ''
                    }`}
            />
            <ButtonComponent
                startIcon={<LocationOnIcon fontSize="small" />}
                title="Unidades"
                buttonSize="large"
                onClick={() => handleNavigation('unidades')}
                isActive={activeSection === 'unidades'} // Passa a propriedade isActive
                className={`w-[35%] sm:w-[50%] md:w-[100%] ${activeSection === 'usuarios' ? 'bg-[#006b33] text-white' : ''
                    }`}
            />
            <ButtonComponent
                startIcon={<AssignmentIcon fontSize="small" />}
                title="Categoria"
                buttonSize="large"
                onClick={() => handleNavigation('categoria')}
                isActive={activeSection === 'categoria'} // Passa a propriedade isActive
                className={`w-[35%] sm:w-[50%] md:w-[100%] ${activeSection === 'usuarios' ? 'bg-[#006b33] text-white' : ''
                    }`}
            />
            <ButtonComponent
                startIcon={<PostAddIcon fontSize="small" />}
                title="Fornecedor"
                buttonSize="large"
                onClick={() => handleNavigation('fornecedor')}
                isActive={activeSection === 'fornecedor'} // Passa a propriedade isActive
                className={`w-[35%] sm:w-[50%] md:w-[100%] ${activeSection === 'usuarios' ? 'bg-[#006b33] text-white' : ''
                    }`}
            />
            <ButtonComponent
                startIcon={<AddShoppingCartIcon fontSize="small" />}
                title="Produtos"
                buttonSize="large"
                onClick={() => handleNavigation('produtos')}
                isActive={activeSection === 'produtos'} // Passa a propriedade isActive
                className={`w-[35%] sm:w-[50%] md:w-[100%] ${activeSection === 'usuarios' ? 'bg-[#006b33] text-white' : ''
                    }`}
            />
            <ButtonComponent
                startIcon={<AppsIcon fontSize="small" />}
                title="Setor"
                buttonSize="large"
                onClick={() => handleNavigation('setor')}
                isActive={activeSection === 'setor'} // Passa a propriedade isActive
                className={`w-[35%] sm:w-[50%] md:w-[100%] ${activeSection === 'usuarios' ? 'bg-[#006b33] text-white' : ''
                    }`}
            />
            <ButtonComponent
                startIcon={<LocationCityIcon fontSize="small" />}
                title="Cidade"
                buttonSize="large"
                onClick={() => handleNavigation('cidade')}
                isActive={activeSection === 'cidade'} // Passa a propriedade isActive
                className={`w-[35%] sm:w-[50%] md:w-[100%] ${activeSection === 'usuarios' ? 'bg-[#006b33] text-white' : ''
                    }`}
            />
        </div>
    );
};

export default HeaderCadastro;
import React, { useState } from 'react';
import { HelpOutline, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import logoPaxVerde from '../../assets/svg/logos/logo-pax-verde.svg';
import LoadingLogin from '../../components/loading/loading-login';
import { useNavigate } from 'react-router-dom';
import packageJson from '../../../package.json';
import logoPax from '../../assets/png/login/multiple_x.png';
import CustomToast from '../../components/toast';
import { formatCPF } from '../../utils/formatCPF';
import { login } from '../../services/post/login';

const LoginPage = () => {
    const navigate = useNavigate();
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);

    const handleCPFChange = (e) => {
        const { value } = e.target;
        if (value.length <= 14) {
            setCpf(formatCPF(value));
        }
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            logar();
        }
    };

    const logar = async () => {
        if (!cpf) {
            CustomToast({ type: 'warning', message: 'Informe o CPF!' });
            return;
        }
        if (!senha) {
            CustomToast({ type: 'warning', message: 'Informe sua senha!' });
            return;
        }
    
        try {
            setLoading(true);
            const response = await login(cpf, senha);
            console.log('Response from login:', response); // Para depuração
            if (response.status) {
                const usuario = {
                    nome: response.data.nome,
                    id: response.data.id,
                };
                localStorage.setItem('user', JSON.stringify(usuario));
                localStorage.setItem('token', response.data.token);
                CustomToast({ type: 'success', message: 'Bem vindo(a)' });
                setTimeout(() => {
                    setCpf("");
                    setSenha("");
                    navigate('/dashboard');
                    setLoading(false);
                }, 2000);
            } else {
                CustomToast({ type: 'warning', message: response.mensagem });
                setLoading(false);
            }
        } catch (error) {
            console.log('Error during login:', error); // Para depuração
            CustomToast({ type: 'error', message: error.mensagem || 'Erro ao fazer login' });
            setLoading(false);
        }
    };


    return (
        <div className="login-container flex h-screen items-center justify-center animate-background">


            <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full z-10">
                <div className="flex justify-center mb-10">
                    <img src={logoPaxVerde} alt="Logo Pax Verde" className="w-28" />
                </div>
                <input
                    type="text"
                    value={cpf}
                    onChange={handleCPFChange}
                    onKeyDown={handleKeyDown}
                    placeholder="CPF"
                    autoComplete='off'
                    className="cpf-input w-full p-3 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="relative w-full mb-4">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={senha}
                        onChange={handleSenhaChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Senha"
                        className="password-input w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer opacity-25"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <VisibilityOffOutlined size={24} /> : <VisibilityOutlined size={24} />}
                    </div>
                </div>
                <button
                    onClick={logar}
                    className="login-button w-full bg-primary text-white p-2 rounded-md bg-custom-green"
                >
                    {loading ? <LoadingLogin /> : 'Entrar'}
                </button>

                <div className="tutorial text-center mt-3">
                    <p>Precisa de ajuda?
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setShowTutorial(true);
                        }}
                            style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
                        >Iniciar tutorial
                        </a>
                    </p>
                </div>
                <div className="versao-app text-center mt-10">
                    <p> Versão {packageJson.version}</p>
                </div>
            </div>
            <div className="logo-pax fixed bottom-0 right-0 z-0 top-0 flex justify-center items-center">
                <img src={logoPax} alt="Logo" style={{ width: '500px', height: '90vh' }} />
            </div>
        </div>
    );
};

export default LoginPage;

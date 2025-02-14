import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import Dashboard from '../pages/dashboard'
import Cadastro from '../pages/cadastro';
import Entradas from '../pages/entradas';
import Saidas from '../pages/saidas';
import Estoque from '../pages/estoque';
import Usuario from '../pages/cadastro/usuario';
import Unidades from '../pages/cadastro/unidades';
import Categoria from '../pages/cadastro/categoria';
import Fornecedor from '../pages/cadastro/fornecedor';
import Produtos from '../pages/cadastro/produtos';
import Setor from '../pages/cadastro/setor';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/entradas" element={<Entradas />} />
            <Route path="/saidas" element={<Saidas />} />
            <Route path="/estoque" element={<Estoque/>} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro/usuarios" element={<Usuario />} />
            <Route path="/cadastro/unidades" element={<Unidades />} />
            <Route path="/cadastro/categoria" element={<Categoria />} />
            <Route path="/cadastro/fornecedor" element={<Fornecedor />} />
            <Route path="/cadastro/produtos" element={<Produtos />} />
            <Route path="/cadastro/setor" element={<Setor />} />
        </Routes>
    );
};

export default AppRoutes;

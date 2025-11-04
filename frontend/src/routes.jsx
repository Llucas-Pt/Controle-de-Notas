// src/App.jsx
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Situaçãodanota from './Componets/Situaçãodanota';
import Cadastrodenota from './Componets/Cadastrodenota';
import Notas from './Componets/Notas';
import LiberaNota from './Componets/LiberaNota';
import Login from './Componets/Login';
import CadastroUser from './Componets/CadastroUser';
import Importacao from './Componets/Importacao';



const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" /> || console.log('Você precisa fazer o login para ter acesso a esta pagina.');
};


function Rotas() {
    // Estado para armazenar o token
    

    return (
        <Router>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/CadastroUser" element={<CadastroUser />} />

                {/* Rotas protegidas */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute >
                            <Notas />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/Notas"
                    element={
                        <PrivateRoute >
                            <Notas />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/LiberaNota"
                    element={
                        <PrivateRoute >
                            <LiberaNota />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/Situaçãodanota"
                    element={
                        <PrivateRoute >
                            <Situaçãodanota />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/Cadastrodenota"
                    element={
                        <PrivateRoute >
                            <Cadastrodenota />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/Importacao"
                    element={
                        <PrivateRoute >
                            <Importacao />
                        </PrivateRoute>
                    }
                />

            </Routes>
        </Router>
    );
}

export default Rotas;
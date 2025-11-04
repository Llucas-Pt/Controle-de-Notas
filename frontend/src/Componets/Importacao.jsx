import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "../Css/import.css"; // Importe o arquivo CSS personalizado
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import users from "../assets/users.png";
import lupa from "../assets/lupa.png";
import upload from "../assets/cloud-computing.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import edit from "../assets/editar.png";



import Desconectar from "../assets/Desconectar.png"
import Note from "../assets/cadastro.png" 
import trello from "../assets/Situacao.png";
import ClipeBoard from "../assets/nota.png";
import desbloqueado from "../assets/libera.png";
import importado from "../assets/download.png";



const Importacao = () => {


  const [selectedFile, setSelectedFile] = useState(null); // Estado para armazenar o arquivo selecionado

  // Função para capturar o arquivo selecionado
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Função para "importar" o arquivo
  const handleImport = () => {
    if (selectedFile) {
      // Aqui você pode realizar a lógica de importação do arquivo
      console.log("Arquivo importado:", selectedFile.name);
      alert(`Arquivo ${selectedFile.name} importado com sucesso!`);
    }
    
  }

  // Função para formatar o tamanho do arquivo
const formatFileSize = (size) => {
  if (size < 1024) return `${size} B`;
  if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / 1048576).toFixed(2)} MB`;
};

  return (

     <div className="d-flex" id="corpo">
        <div>
          {/* Sidebar como Navbar */}
          <Navbar
            className="flex-column sidebar"
            id="navbar"
          >
            <Navbar.Brand href="#Situaçãodanota">
              <img src={logo} alt="Logo" />
            </Navbar.Brand>
    
            <Navbar.Collapse id="basic-navbar-nav">
    
              
              <Nav className="flex-column">
    
                
              <div id="test" >
    
    
    
              <Nav.Link href="http://localhost:5173/Notas">
                {" "}
                <img src={Note} alt="trello" />
                Notas 
              </Nav.Link>
    
              
              <Nav.Link href="http://localhost:5173/Situaçãodanota">
                {" "}
                <img src={trello} alt="trello" />
                Situação da Nota
              </Nav.Link>
                {/* Controle de hover para abrir o dropdown */}
                <Nav.Link href="http://localhost:5173/Cadastrodenota">
                  {" "}
                  <img src={ClipeBoard} alt="ClipeBoard" /> Cadastro de Nota
                </Nav.Link>
    
    
                <Nav.Link href="http://localhost:5173/LiberaNota">
                  {" "}
                  <img src={desbloqueado} alt="desbloqueado" /> Liberação de Nota
                </Nav.Link>
    
                <Nav.Link href="http://localhost:5173/Importacao">
                  {" "}
                  <img src={importado} alt="desbloqueado" /> Importação
                </Nav.Link>
    
                
    
    
                <Nav.Link id="deslogado" href="http://localhost:5173/"  onClick={() => {sair(); }}>
                    {" "}
                    
                    Desconectar
                    <img src={Desconectar} alt="desbloqueado" id="im"/> 
                  </Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
     </div>

    {/* Conteúdo Principal */}
    <div className="container">
        <h3 className="mt-3 text-center text-white">Importar Arquivo</h3>
        <div className="upload-area mt-4">
  <div className='centra'>
    <div className="icon-container">
      <img src={upload} alt="upload" className="upload-icon" />
      <label htmlFor="file" className="upload-label">
        Arraste ou escolha um arquivo para upload
      </label>
    </div>
  </div>
  <input
    type="file"
    id="file"
    name="file"
    className="upload-input"
    onChange={handleFileChange} // Captura o arquivo selecionado
  />
</div>

        {/* Exibe informações do arquivo selecionado */}
        {selectedFile && (
          <div className="mt-4 card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Detalhes do Arquivo</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Nome:</strong> {selectedFile.name}
                </li>
                <li>
                  <strong>Tipo:</strong> {selectedFile.type || "Desconhecido"}
                </li>
                <li>
                  <strong>Tamanho:</strong> {formatFileSize(selectedFile.size)}
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="button-container mt-4">
          <button
            className="btn btn-primary"
            onClick={handleImport}
            disabled={!selectedFile} // Desabilita se nenhum arquivo foi selecionado
          >
            Importar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setSelectedFile(null)} // Limpa o arquivo selecionado
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Importacao;
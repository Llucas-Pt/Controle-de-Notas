
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Situacao.css"; // Importe o arquivo CSS personalizado
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import users from "../assets/users.png";
import lupa from "../assets/lupa.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import edit from "../assets/editar.png";


import Desconectar from "../assets/Desconectar.png"
import Note from "../assets/cadastro.png" 
import trello from "../assets/Situacao.png";
import ClipeBoard from "../assets/nota.png";
import desbloqueado from "../assets/libera.png";
import importado from "../assets/download.png";

const Situaçãodanota = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [datainicio, setdatainicio] = useState("");
  const [datafinal, setdatafinal] = useState("");
  const [situacao, setsituacao] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Índice da linha em edição
  const [newSituacao, setNewSituacao] = useState(""); // Valor da nova situação
  // Estado para armazenar as filiais adicionadas
  const [filiais, setFiliais] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz a consulta com base nas datas
      const consultar = await fetch(`http://localhost:3000/situacaonotas?startDate=${datainicio}&endDate=${datafinal}`);

      if (!consultar.ok) {
        throw new Error('Erro ao buscar as filiais');
      }

      const data = await consultar.json(); // Aqui corrigimos o nome do objeto

      setFiliais(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar filiais:', error);
    }
    console.log(startDate, endDate);

    // Limpeza dos inputs se necessário
    setdatainicio('');
    setdatafinal('');
  };


  const handleSaveClick = async (index) => {
    const updatedFiliais = [...filiais];
    const idBase_de_Notas = updatedFiliais[index].idBase_de_Notas; // Certifique-se de que está obtendo o ID correto

    updatedFiliais[index].Situacao = newSituacao;

    try {
      const atualizador = await fetch(`http://localhost:3000/atualizacao/${idBase_de_Notas}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Situacao: newSituacao }), // Corpo da requisição com a nova situação
      });

      if (!atualizador.ok) {
        throw new Error("Erro ao atualizar a situação");
      }

      const data = await atualizador.json();
      console.log("Situação atualizada:", data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }

    setFiliais(updatedFiliais); // Atualiza o estado com o novo valor
    setEditIndex(null); // Sai do modo de edição
  };

  const alterar = (index) => {
    setEditIndex(index); // Define o índice da linha que está sendo editada
    setNewSituacao(filiais[index].Situacao); // Preenche o input com o valor atual
  };

  const sair = () => {
    const token = localStorage.removeItem("token");
  }


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
      {/* Conteúdo principal */}
      <div id="CentraTable">
        <form id="formlar" onSubmit={handleSubmit}>
          <div class="">
            <div id="buscador"  >
              <div id="pesqunava" >
              <img src={lupa} alt="lupa" />
              <input type="text" placeholder="Search" svg="" />
              </div>

              <div>
              <input
                type="text"
                value={datafinal}
                onChange={(e) => setdatafinal(e.target.value)}
                placeholder="Fornecedor"
                class=""
                id="data"
              />
                </div>
                
              <div>
              <input
                type="text"
                value={datainicio}
                onChange={(e) => setdatainicio(e.target.value)}
                placeholder="Nota"
                class=""
                id="data"
              />
               </div>

                <div>
              <button class="btn btn-success"  id="botao" type="submit" >
                Consultar
              </button>
              </div>

              </div>
          </div>
        </form>



        <table class="table table-white table-striped" >
          <thead class="rounded-2">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Filial</th>
              <th scope="col">Fornecedor</th>
              <th scope="col">investimento</th>
              <th scope="col">Data Emissão</th>
              <th scope="col">Data Vencimento</th>
              <th scope="col">Pedido</th>
              <th scope="col">Nota Fiscal</th>
              <th scope="col">Situação</th>
            </tr>
          </thead>
          
          <tbody >
            {filiais.map((filial, i) => (

              <tr id="tr" key={i}>
                <td class="table-dark">{i + 1}</td>
                <td class="table-dark">{filial.Nome_fantasia}</td>
                <td class="table-dark">{filial.Fornecedor}</td>
                <td class="table-dark">{filial.Investimento}</td>
                <td class="table-dark">{filial.Data_de_emissao}</td>
                <td class="table-dark">{filial.Data_de_vencimento}</td>
                <td class="table-dark">{filial.Pedido}</td>
                <td class="table-dark">{filial.NF_DANFE}</td>
                <td class="table-dark">{filial.Situacao}</td>
                <td class="table-dark">
                  {editIndex === i ? (
                    // Se a linha está em modo de edição, mostra um campo de input
                    <select
                      class="form-select table-dark"
                      aria-label="Disabled select example"
                      value={newSituacao}
                      onChange={(e) => setNewSituacao(e.target.value)}
                    >
                      <option value="Recebido" class="dropdown-item">
                        Recebido
                      </option>
                      <option value="Cadastrado" class="dropdown-item">
                        Cadastrado
                      </option>
                      <option value="Entregue" class="dropdown-item">
                        Entregue
                      </option>
                    </select>
                  ) : (
                    <td ></td>
                  )}
                </td>
                <td class="table-dark" >
                  {editIndex === i ? (
                    // Mostra o botão de salvar se estiver no modo de edição
                    <button onClick={() => handleSaveClick(i) } class="btn btn-dark table-dark">Salvar</button>
                  ) : (
                    // Botão de editar quando não estiver em modo de edição
                    <button id="edit" onClick={() => alterar(i)} class="table-dark">
                      <img src={edit} alt="editar" width={"15px"} height={"15px"} />
                    </button>
                  )}
                </td>
              </tr>

            ))}
          </tbody>

        </table>
      </div>



    </div>

  );

};

export default Situaçãodanota;

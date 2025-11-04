import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Css/Nota.css"; // Importe o arquivo CSS personalizado
import { use } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import users from "../assets/users.png";
import lupa from "../assets/lupa.png";

import DatePicker from "react-datepicker";
import edit from "../assets/editar.png";
import Desconectar from "../assets/Desconectar.png"
import Note from "../assets/cadastro.png" 
import trello from "../assets/Situacao.png";
import ClipeBoard from "../assets/nota.png";
import desbloqueado from "../assets/libera.png";
import importado from "../assets/download.png";


const Notas = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [datainicio, setdatainicio] = useState("");
  const [datafinal, setdatafinal] = useState("");
  const [situacao, setsituacao] = useState("");
  const [editIndex, setEditIndex] = useState(); // Índice da linha em edição
  const [newSituacao, setNewSituacao] = useState("");
  const [newdatainicio, setNewdatainicio] = useState(""); // Valor da nova situação
  // Estado para armazenar as filiais adicionadas
  const [filiais, setFiliais] = useState([]);
  const [notas, setNotas] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [consulta, setconsulta] = useState()



/*
const fetchNotas = async () => {
  try {
    const buscador = await fetch("http://localhost:3000/api/notas");

    if (!buscador.ok) throw new Error("Erro ao buscar notas");

    const data = await buscador.json();
    setNotas(data);
    console.log({notas})
} catch (error) {
    console.error(error.message);
}
};*/

const fetchNotas = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Erro ao buscar notas");

    const data = await response.json();
    setNotas(data);
    console.log({ notas });
  } catch (error) {
    console.error(error.message);
  }
};

const handlePagination = (page) => {
  const url = `http://localhost:3000/api/notas/${page}`;
  setActivePage(page)
  fetchNotas(url);
};

useEffect( () => {
  fetchNotas("http://localhost:3000/api/notas/1");
},[])



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz a consulta com base nas datas
      const consultar = await fetch(`http://localhost:3000/notas?consulta=${consulta}`);

      if (!consultar.ok) {
        throw new Error('Erro ao buscar as filiais');
      }

      const data = await consultar.json(); // Aqui corrigimos o nome do objeto
      console.log(data)
      setFiliais(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar filiais:', error);
    }

    // Limpeza dos inputs se necessário
    setconsultao('');
  };


  const handleSaveClick = async (index) => {
    const updatedFiliais = [...filiais];
    const idBase_de_Notas = updatedFiliais[index].idBase_de_Notas;
  
    updatedFiliais[index].Situacao = newSituacao;
    updatedFiliais[index].Data_de_emissao = newdatainicio;
  
    try {
      const atualizador = await fetch(`http://localhost:3000/atualizacao/${idBase_de_Notas}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Situacao: newSituacao,
          Data_de_emissao: newdatainicio,
        }),
      });
  
      if (!atualizador.ok) {
        throw new Error("Erro ao atualizar a situação");
      }
  
      const data = await atualizador.json();
      console.log("Dados atualizados:", data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  
    setFiliais(updatedFiliais);
    setEditIndex(null);
  };

 const alterar = (index) => {
    setEditIndex(index); // Define o índice da linha que está sendo editada
    //setNewSituacao(filiais[index].Situacao);
    //setNewdatainicio(filiais[index].Datainicio); // Preenche o input com o valor atual
  };

  const sair = () => {
    localStorage.removeItem("token");
  };


  //GIF

  const [gifSources, setGifSources] = useState({
    trello: "../assets/search.png", // Inicialmente a imagem estática
    ClipeBoard: "../assets/edit.png",
    desbloqueado: "../assets/download.png",
    importado: "../assets/download.png",
    Note: "../assets/Notes.png",
  });

  const handleMouseEnter = (key) => {
    setGifSources((prev) => ({
      ...prev,
      [key]: `../assets/${key}.gif`, // Troca para o GIF
    }));
  };

  const handleMouseLeave = (key) => {
    setGifSources((prev) => ({
      ...prev,
      [key]: `../assets/${key}.png`, // Volta para a imagem estática
    }));
  };
  


/*
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
*/


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
            <div id="buscadorr"  >
              <div id="pesqunava" >
              <img src={lupa} alt="lupa" />
              <input type="text" placeholder="Search" svg="" 
              value={consulta}
              onChange={(e) => setconsulta(e.target.value)}
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
              <th scope="col">Observações</th>
              <th scope="col">Pedido</th>
              <th scope="col">Nota Fiscal</th>
              <th scope="col">Situação</th>
             
            </tr>
</thead>
        

          
<tbody>
  {notas.map((filial, i) => (
    <tr id="tr" key={i}>
      <td className="table-dark">{i + 1}</td>
      <td className="table-dark">{filial.filial}</td>
      <td className="table-dark">{filial.fornecedor}</td>
      <td className="table-dark">{filial.investimento}</td>
      <td className="table-dark">{filial.data_emissao}</td>
      <td className="table-dark">{filial.data_vencimento}</td>
      <td className="table-dark">{filial.observacao}</td>
      <td className="table-dark">{filial.pedido}</td>
      <td className="table-dark">{filial.notas_fiscal}</td>
      <td className="table-dark">{filial.situacao}</td>
      <td className="table-dark">
        {editIndex === i ? (

<>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      <div class="modal-body">
{/* Input para editar a situação */}

{/* Input para editar a data início */}



<div class="row">



<div class="row">
<div class=" mb-3 col-md-7">
<input type="number" class="col-6 form-control" onChange={(e) => setNewdatainicio(e.target.value)} value={newdatainicio} placeholder="Pedido"/>
</div>
<div  class="mb-3 col-md-7"> 
<input type="number" class="col-6 form-control" onChange={(e) => setNewdatainicio(e.target.value)}  placeholder="Nota Fiscal"/>
</div>
</div>

<div class="row">
<div class="col-md-5">
<label id="editadata">Data de Emissão</label>
<input type="date" class="col-12 form-control"  onChange={(e) => setNewdatainicio(e.target.value)} value={newdatainicio} placeholder="Nova Data Início"/>
</div>


<div  class="mb-3 col-md-5 ms-auto"> 
<label id="editadata" >Data de Vencimento</label>
<input type="date"  class="col-12 form-control"  onChange={(e) => setNewdatainicio(e.target.value)} value={newdatainicio} placeholder="Nova Data Início"/>
</div>
</div>
</div>





<select
    class="col-5 form-select table-dark"
   
    aria-label="Disabled select example"
    onChange={(e) => setNewSituacao(e.target.value)}value={newSituacao}>
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

<div class="modal-footer" data-bs-toggle="modal"  data-bs-whatever="@mdo" >
<button className="btn btn-success" onClick={() => handleSaveClick(i)}>Salvar</button>       
<button className="btn btn-danger" onClick={() => setEditIndex(null)}>Cancelar</button>
</div>

</div>
</div>
</div>
</div>
</div>

</>

) 
:  
(
    <td></td>
)}
</td>
<td className="table-dark">
<button button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={() => alterar(i)}> Editar </button>

</td>
</tr>
    
))}
</tbody>
</table>

<nav aria-label="Page navigation example">
  <ul className="pagination">
    {[1,2,3,4].map((page, i) => (
      <li
        key={page}
        className={`page-item  ${activePage  === page ? "active" : ""}` }
      >
        <a
          className="page-link "
          href="#"
          onClick={() => handlePagination(page)} // Passa o valor da página correta
        >
          {page} {/* Exibe o número da página */}
        </a>
      </li>
      
    ))}
  </ul>
</nav>
  
</div>
</div>

);
};

export default Notas;

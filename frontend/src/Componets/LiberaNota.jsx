
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "../Css/Home.css"; // Importe o arquivo CSS personalizado
import logo from "../assets/logo.png";
import users from "../assets/users.png";
import lupa from "../assets/lupa.png";

//import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";

import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import edit from "../assets/editar.png";
import saveAs from 'file-saver';
import "../Css/Liberacao.css"

import Desconectar from "../assets/Desconectar.png"
import Note from "../assets/cadastro.png" 
import trello from "../assets/Situacao.png";
import ClipeBoard from "../assets/nota.png";
import desbloqueado from "../assets/libera.png";
import importado from "../assets/download.png";

import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  FormControl,
  InputLabel,
TablePagination} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { AiOutlineDownload } from 'react-icons/ai';
//import { set } from "react-datepicker/dist/date_utils";


const Orders = () => {

  const [Liberar, setLiberar] = useState([])
  const [data, setdata ] = useState('')
  const [fornecedor, setfornecedor] = useState('')
  const [notafiscal, setnotafiscal] = useState()
  const [empresa, setempresa] = useState()
  const [alerts, setAlerts] = useState([]);
  let [salva, setsalva] = useState([])


  
  

const LiberaNota = async (e) => {
  e.preventDefault();
  

  try {
  
  const consulta = await fetch(`http://localhost:3000/liberar?notafiscal=${notafiscal}&fornecedor=${fornecedor}`)

    if (!consulta.ok) {
      throw new Error('Erro ao buscar as notas');
    }

    const dado = await consulta.json()

    const te = dado.map((linha ) => ({
     Fornecedor: linha.fornecedor, 
     NF_DANFE: linha.NF_DANFE
    }))
    setLiberar(te)

    /* prevSalva: Representa o valor atual de salva (ou seja, o estado atual).
    ...prevSalva: Utiliza o spread operator (...) para copiar todos os itens existentes no array prevSalva.
    ...dado: Também utiliza o spread operator para adicionar os itens do array dado (que veio da API) ao final.*/ 

    setsalva((prevSalva) => [...prevSalva, ...dado]); // Atualiza diretamente salva


  } catch (error) {
    console.error('Erro ao buscar Notas:', error);
  }

   // Limpeza dos inputs se necessário
   setnotafiscal('');
   setfornecedor('');
  }

/*
function exporte() {

const coluna = "filial, Fornecedor, Investimento, Pedido, Valor Mes Atual, Valor Mes Passado, Nota Fiscal, Obeservação"

const exporta = (salva)

const NotaLiberada = path.join(__dirname, 'Arquivo.csv')

fs.writeFile('Arquivo.csv', coluna + exporta, (err)=>{
  if(err) {
    console.log('Erro na criação do arquivo:', err.message); return;
  }
  console.log("Arquivo criado com sucesso em:", NotaLiberada);
})
}*/

/*
function exporte() {
  // Cabeçalhos e dados
  const coluna =  "Filial, Fornecedor, Investimento, Pedido, Valor Mes Atual, Valor Mes Passado, Nota Fiscal, Observação\n";

  const dados = salva.map((linha) =>`${linha.Filial_codigo},${linha.Fornecedor},${linha.Investimento},${linha.Pedido},${linha.ValorMesAtual},${linha.ValorUltMes},${linha.NF_DANFE},${linha.Observacao}`).join("\n");


  // Cria o conteúdo do CSV
  const csvContent = coluna + dados;

  // Cria um blob para o CSV
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Salva o arquivo usando FileSaver
  saveAs(blob, "Arquivo.csv");
}*/
const appendAlert = (message, type) => {
  const newAlert = { id: Date.now(), message, type };
  setAlerts((prevAlerts) => [...prevAlerts, newAlert]); // Adiciona o alerta ao estado

    // Remove o alerta automaticamente após 1 segundo
    setTimeout(() => {
      removeAlert(newAlert.id); // Remove o alerta pelo ID
    }, 5000);

};

const removeAlert = (id) => {
  setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id)); // Remove alerta pelo ID
};

async function exporte(e) {
  e.preventDefault();

  // Dados no formato JSON (array de objetos)
  const dados = salva.map((linha, i ) => ({
    Item: i + 1,
    Filial_codigo: linha.Filial_codigo,
    Razao_social: linha.Razao_social,
    Nome_fantasia: linha.Nome_fantasia,
    Fornecedor: linha.Fornecedor,
    Investimento: linha.Investimento,
    Pedido: linha.Pedido,
    ValorMesAtual: linha.ValorMesAtual,
    ValorUltMes: linha.ValorUltMes,
    NF_DANFE: linha.NF_DANFE,
    Data_de_vencimento: linha.Data_de_vencimento,
    Observacao: linha.Observacao,
  }));

  console.log(dados)

  

  try {
    const consulta = await fetch("http://localhost:3000/exportar/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dados, data, empresa }), // Envia o array de objetos JSON
    });

    if (!consulta.ok) {
      throw new Error("Erro ao exportar o arquivo");
    }

    // Obtém o arquivo para download
    const blob = await consulta.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Relatorio.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();

 
  appendAlert("Exportação realizada com sucesso!", "success");// Desativa o carregamento antes de redirecionar
 
  } catch (error) {
    console.error("Erro ao exportar:", error);

    // Exibe alerta de erro
    appendAlert("Erro ao exportar o arquivo. Verifique os logs.", "danger");
  }
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
<div className="containerr">

<form onSubmit={LiberaNota} id="liberadorform">



<div id="alinhandodiv" class="containerr text-center">
  <div class="row">

    <div class="col" id="divselecao">
        <select
          name="empresa"
          id="empresa"
          class="form-select" 
          value={empresa}
          onChange={(e) => setempresa(e.target.value)}
        >
          <option selected>...</option>
          <option value="TRANSILVA TRASPORTES E LOGISTICA LTDA">
            TRANSILVA TRANSPORTADORA E LOGISTICA LTDA
          </option>
          <option value="DESTAQUE TRANSPORTES E LOGISTICA LTDA">
            DESTAQUE TRANSPORTADORA E LOGISTICA LTDA
          </option>
          <option value="CODEPE - CENTRO OPER.LOG.PORTO ENGENHO LTDA">
            CODEPE - CENTRO OPER.LOG.PORTO ENGENHO LTDA
          </option>
          <option value="AUTOVIVA CAMINHOES E ONIBUS LTDA">
            AUTOVIVA CAMINHOES E ONIBUS LTDA
          </option>
          <option value="AUTOVIVA SERVICOS LTDA">
            AUTOVIVA SERVICOS LTDA
          </option>
          <option value="GEPAX TRANSPORTES E LOGISTICA LTDA">
            GEPAX TRANSPORTES E LOGISTICA LTDA
          </option>
        </select>
    </div>

    <div class="col">
        <input
          type="date"
          name="data"
          placeholder="data"
          class="form-control" aria-label="Recipient's username with two button addons"
          value={data}
          onChange={(e) => setdata(e.target.value)}
 /></div>

<div class="col" id="divfornecedor">
        <input
          type="text"
          name="fornecedor"
          
          placeholder="Fornecedor"
         class="form-control" aria-label="Recipient's username with two button addons"
          value={fornecedor}
          onChange={(e) => setfornecedor(e.target.value)}
        /></div>
        
 <div class="col">
          <input
          type="text"
          name="nota"
          placeholder="Nota"
          class="form-control" aria-label="Recipient's username with two button addons"
          value={notafiscal}
          onChange={(e) => setnotafiscal(e.target.value)}
        /></div>

 

<div class="col-md-1">
       <button type="submit" class="btn btn-success" id="button-addon1">Inserir</button>
</div>
</div>
</div>



  
</form>

  <table class="table table-white table-striped" >
  <thead class="rounded-2">
            <tr>
              <th scope="col"># </th>
              <th scope="col">Filial</th>
              <th scope="col">Fornecedor</th>
              <th scope="col">Investimento</th>
              <th scope="col">Pedido</th>
              <th scope="col">Valor Mes Atual</th>
              <th scope="col">Valor Mes Passado</th>
              <th scope="col">Nota Fiscal</th>
              <th scope="col">Observação</th>
            </tr>
          </thead>

<tbody >
  {salva.map((libe, i)=> (
  <tr id="tr" key={i}>
    <td class="table-dark">{i + 1}</td>
    <td class="table-dark">{libe.Filial_codigo}</td>
    <td class="table-dark">{libe.Fornecedor}</td>
    <td class="table-dark">{libe.Investimento}</td>
    <td class="table-dark">{libe.Pedido}</td>
    <td class="table-dark">{libe.ValorMesAtual}</td>
    <td class="table-dark">{libe.ValorUltMes}</td>
    <td class="table-dark">{libe.NF_DANFE}</td>
    <td class="table-dark">{libe.Observacao}</td>
  </tr>
))}
  </tbody>

  </table>



  <div>
      {/* Placeholder para os alertas */}
      <div id="liveAlertPlaceholder">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <div>{alert.message}</div>
            <button
              type="button"
              className="btn-close"
              onClick={() => removeAlert(alert.id)} // Remove o alerta ao clicar
              aria-label="Close"
            ></button>
          </div>
        ))}
      </div>

      {/* Botão para exportar */}
      <Button
        id="liveAlertBtn"
        variant="contained"
        startIcon={<DownloadIcon />}
        style={{ float: "left", backgroundColor:"#157347" }}
        onClick={exporte}
      >
        Exportar Excel
      </Button>
    </div>
</div>



</div>
);
};

export default Orders;

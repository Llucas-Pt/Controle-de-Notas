import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Home.css"; // Importe o arquivo CSS personalizado
import logo from "../assets/logo.png";
import users from "../assets/users.png";
import lupa from "../assets/lupa.png";

import Desconectar from "../assets/Desconectar.png"
import Note from "../assets/cadastro.png" 
import trello from "../assets/Situacao.png";
import ClipeBoard from "../assets/nota.png";
import desbloqueado from "../assets/libera.png";
import importado from "../assets/download.png";


function Cadastrodenota() {
  const [tiponota, setTiponota] = useState("");
  const [Filial_codigo, setFilial_codigo] = useState(0);
  const [nomefantasia, setnomefantasia] = useState("");
  const [razaosocial, setrazaosocial] = useState("");
  const [investimento, setinvestimeno] = useState("");
  const [fornecedor, setfornecedor] = useState("");
  const [pedido, setpedido] = useState();
  const [datadeemissao, setdatadeemissao] = useState("");
  const [datavencimento, setdatavencimento] = useState("");
  const [NF, setNF] = useState("");
  const [protocolo, setprotocolo] = useState("");
  const [valormespass, setvalormespass] = useState();
  const [valormesatual, setvalormesatual] = useState();
  const [parcelas, setparcelas] = useState("");
  const [pagamento, setpagamento] = useState("");
  const [tipo, settipo] = useState("");
  const [situacao, setsituacao] = useState("");
  const [conta, setconta] = useState();
  const [observa, setobserva] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Funções para mostrar e esconder o dropdown ao passar o mouse
  /*  
    const [showDropdown, setShowDropdown] = useState(false); 
    const handleMouseEnter = () => setShowDropdown(true);
    const handleMouseLeave = () => setShowDropdown(false);
*/

  const codigosParaRazaoSocial = {
    1: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    2: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    3: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    4: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    5: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    6: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    7: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    8: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    9: "TRANSILVA TRASPORTES E LOGISTICA LTDA",
    10: "DESTAQUE TRANSPORTES E LOGISTICA LTDA",
    11: "DESTAQUE TRANSPORTES E LOGISTICA LTDA",
    12: "AUTOVIVA CAMINHOES E ONIBUS LTDA",
    13: "AUTOVIVA SERVICOS LTDA",
    14: "CODEPE - CENTRO OPER.LOG.PORTO ENGENHO LTDA",
    16: "JAPP PARTICIPACOES LTDA",
    17: "JAPP EMPREENDIMENTOS E PARTICIPACOES LTDA",
    // Adicione outros códigos e razões sociais aqui
  };

  useEffect(() => {
    if (Filial_codigo) {
      if (codigosParaRazaoSocial[Filial_codigo]) {
        setrazaosocial(codigosParaRazaoSocial[Filial_codigo]);
      } /*else {
      setrazaosocial(''); // Limpa se o código não for encontrado
  }*/
    }
  }, [Filial_codigo]);

  useEffect(() => {
    if (tiponota === "Fixo") {
      setpagamento("fixo");
    } else if (tiponota === "Variavel") {
      setpagamento("variavel");
    }  else setpagamento("");

  }, [tiponota]);


  
  //Função de requisição
  const acesso = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Codigo de verificação do código da filial
    const validaempresa = await fetch(
      `http://localhost:3000/filial/${Filial_codigo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Cabeçalhos são opcionais aqui
        },
      }
    );

    if (validaempresa.ok) {
      const filialData = await validaempresa.json(); //Espera pela resposta e converte para JSON
      console.log(filialData); // Aqui você terá os dados da filial
    } else {
      console.error("Filial não encontrada");
      return alert("Filial não encontrada");
    }

   const criado_por = localStorage.getItem('token')

   console.log(criado_por)
    //Codigo de requisição para a inclusão dos dados
    try {
      const response = await fetch("http://localhost:3000/cadastrarNota", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica o tipo de conteúdo
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Envia o token no cabeçalho
        },
        body: JSON.stringify({ 
          criado_por,
          tiponota,
          Filial_codigo,
          razaosocial,
          nomefantasia,
          investimento,
          fornecedor,
          pedido,
          datadeemissao,
          datavencimento,
          NF,
          protocolo,
          valormespass,
          valormesatual,
          parcelas,
          pagamento,
          tipo,
          situacao,
          conta,
          observa,
        }), // Envia os dados como JSON
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Processa a resposta JSON
      setUser(data); // Armazena a resposta no estado
      setError(null); // Limpa qualquer erro anterior
      alert("Nota Inserida!");
      setTiponota('')
      setFilial_codigo('')
      setnomefantasia('')
      setrazaosocial('')
      setinvestimeno('')
      setfornecedor('')
      setpedido('')
      setdatadeemissao('')
      setdatavencimento('')
      setNF('')
      setprotocolo('')
      setvalormespass('')
      setvalormesatual('')
      setparcelas('')
      setpagamento('')
      settipo('')
      setsituacao('')
      setconta('')
      setobserva('')
      navigate("/Cadastrodenota");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setError(error.message); // Armazena a mensagem de erro no estado
    }
  };

  const sair = () => {
    const token = localStorage.removeItem("token");
  }

  /***********************************/
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

      <div id="outro" grid text-center>
        <form id="formulario" onSubmit={acesso}>


          <div class="vstack gap-2 col-md-5 mx-auto">
            {/*Campo de Tipo de Nota*/}
            <div class="p-2">
              <select
                name="tiponota"
                id="tiponota"
                class="form-select"
                aria-label="Disabled select example"
                onChange={(e) => setTiponota(e.target.value)}
              >
                <option selected>Tipo de Nota</option>
                <option value="Fixo" class="dropdown-item">
                  Fixo
                </option>
                <option value="Variavel" class="dropdown-item">
                  Váriavel
                </option>
              </select>
            </div>
          </div>

          <br />

          <div class="row" >
            {/*Campo de Código Filial*/}
            <div class="col-6">
              <label>Código Filial</label>
              <select
                name="codigofilial"
                id="codigofilial"
                class="form-select"
                aria-label="Disabled select example"
                value={Filial_codigo}
                onChange={(e) => setFilial_codigo(parseInt(e.target.value, 10))}
              >
                <option selected>...</option>
                <option value="1" class="dropdown-item">
                  1 - MATRIZ
                </option>
                <option value="2" class="dropdown-item">
                  2 - SAO PAULO
                </option>
                <option value="3" class="dropdown-item">
                  3 - F.ALAGOAS
                </option>
                <option value="4" class="dropdown-item">
                  4 - F.BAHIA
                </option>
                <option value="5" class="dropdown-item">
                  5 - FILIAL ES
                </option>
                <option value="6" class="dropdown-item">
                  6 - FILIAL SERRA -ES
                </option>
                <option value="7" class="dropdown-item">
                  7 - F.CAMPO BOM RS
                </option>
                <option value="8" class="dropdown-item">
                  8 - F.CURITIBA PR
                </option>
                <option value="9" class="dropdown-item">
                  9 - F.ITUMBIARA
                </option>
                <option value="10" class="dropdown-item">
                  10 - DRL -ES
                </option>
                <option value="11" class="dropdown-item">
                  10 - DRL -SP
                </option>
                <option value="12" class="dropdown-item">
                  12 - AUTOVIVA CAMINHOES
                </option>
                <option value="13" class="dropdown-item">
                  13 - AUTOVIVA SERVICOS
                </option>
                <option value="14" class="dropdown-item">
                  14 - CODEPE
                </option>
                <option value="15" class="dropdown-item">
                  15 - JAPP
                </option>
                <option value="16" class="dropdown-item">
                  15 - JAPP PARTICIPACOES
                </option>
              </select>
            </div>
            {/*Campo de Razão social*/}
            <div class="col-6">
              <label>Razação Social</label>
              <select
                name="razaosocial"
                id="razaosocial"
                class="form-select"
                aria-label="Disabled select example"
                value={razaosocial}
                onChange={(e) => setrazaosocial(e.target.value)}
              >
                <option selected>...</option>
                <option
                  value="TRANSILVA TRASPORTES E LOGISTICA LTDA"
                  class="dropdown-item"
                >
                  TRANSILVA TRANSPORTADORA E LOGISTICA LTDA
                </option>
                <option
                  value="DESTAQUE TRANSPORTES E LOGISTICA LTDA"
                  class="dropdown-item"
                >
                  DESTAQUE TRANSPORTADORA E LOGISTICA LTDA
                </option>
                <option
                  value="CODEPE - CENTRO OPER.LOG.PORTO ENGENHO LTDA"
                  class="dropdown-item"
                >
                  CODEPE - CENTRO OPER.LOG.PORTO ENGENHO LTDA
                </option>
                <option
                  value="AUTOVIVA CAMINHOES E ONIBUS LTDA"
                  class="dropdown-item"
                >
                  AUTOVIVA CAMINHOES E ONIBUS LTDA
                </option>
                <option value="AUTOVIVA SERVICOS LTDA" class="dropdown-item">
                  AUTOVIVA SERVICOS LTDA{" "}
                </option>
                <option
                  value="GEPAX TRANSPORTES E LOGISTICA LTDA"
                  class="dropdown-item"
                >
                  GEPAX TRANSPORTES E LOGISTICA LTDA
                </option>
                <option value="JAPP LTDA" class="dropdown-item">
                  JAPP LTDA
                </option>
              </select>
            </div>
            </div>

          <br />

            <div class="row" >

             {/*Campo de Nome fantasia*/}
            <div class="col-6 col-md-3">
              <label>Empresa</label>
              <input
                type="text"
                name="filial"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="..."
                onChange={(e) => setnomefantasia(e.target.value)}
                value={nomefantasia}
              />
            </div>
            {/*Campo de Fornecedor*/}
            <div class="col-6 col-md-3">
              <label>Fornecedor</label>{" "}
              <input
                type="text"
                name="fornecedor"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="..."
                onChange={(e) => setfornecedor(e.target.value)}
                value={fornecedor}
              />
            </div>
  
            {/*Campo de Investimento*/}
            <div class="col-6 col-md-6">
             
              <label>Investimento</label>


              <select
                name="investimento"
                id="exampleFormControlInput1"
                class="form-select"
                aria-label="Disabled select example"
                placeholder="..."
                onChange={(e) => setinvestimeno(e.target.value)}
                value={investimento}
              >
                <option selected>...</option>
                <option value="Sistema" class="dropdown-item">
                SISTEMA
                </option>
                <option value="Infraestrutura" class="dropdown-item">
                INFRAESTRUTURA
                </option>
                <option value="Internet" class="dropdown-item">
                 INTERNET
                </option>
                <option value="TELEFONE" class="dropdown-item">
                 TELEFONE
                </option>
                <option value="Email" class="dropdown-item">
                 E-MAIL
                </option>
              </select>
            </div>

            </div>



            <div class="row" >
            {/*Campo de Data de Emissão*/}
            <div class="col-6 ">
              <label>Data de Emissão</label>
              <input
                type="date"
                name="dataemissao"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Data de Emissão"
                onChange={(e) => setdatadeemissao(e.target.value)}
                value={datadeemissao}
              />
            </div>
            {/*Campo de Data de Vencimento*/}
            <div class="col-6 ">
              <label>Data do Vencimento</label>
              <input
                type="date"
                name="datavencimento"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Data de Vencimento"
                onChange={(e) => setdatavencimento(e.target.value)}
                value={datavencimento}
              />
            </div>
            </div>

            <div class="row" >
            {/*Campo de Pedido*/}
            <div class="col-6 col-md-12">
              <label>Pedido</label>
              <input
                type="number"
                name="pedido"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="0"
                onChange={(e) => setpedido(e.target.value)}
                value={pedido}
              />
            </div>
            </div>


            <div class="row" >
            {/*Campo de Valor do Mês Atul*/}
            <div class="col-6 col-md-4 ">
              <label>Valor do Mês atual</label>
              <input
                type="number"
                name="NF"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="R$"
                onChange={(e) => setvalormesatual(e.target.value)}
                value={valormesatual}
              />
            </div>
             {/*Campo de Valor do Mês Passado*/}
             <div class="col-6 col-md-4 ">
              <label>Valor do Mês Pass.</label>
              <input
                type="number"
                name="valormespass"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="R$"
                onChange={(e) => setvalormespass(e.target.value)}
                value={valormespass}
              />
            </div>
            {/*Campo de Nota Fiscal*/}
            <div class="col-6 col-md-4 ">
              <label>Nota Fiscal</label>
              <input
                type="text"
                name="NF"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="0"
                onChange={(e) => setNF(e.target.value)}
                value={NF}
              />
            </div>
            </div>



            <div class="row" >
            {/*Campo de Pagamento*/}
            <div class="col-6 ">
              <label>Pagamento</label>
              <select
                name="pagamento"
                id="pagamento"
                class="form-select"
                aria-label="Disabled select example"
                onChange={(e) => setpagamento(e.target.value)}
                value={pagamento}
              >
                <option selected>...</option>
                <option value="fixo" class="dropdown-item">
                  Fixo
                </option>
                <option value="variavel" class="dropdown-item">
                  Variavel
                </option>
              </select>

            </div>
            {/*Campo de Parcelas*/}
            <div class="col-6 col-md-6">
              <label>Parcelas</label>
              <select
                name="parcelas"
                class="form-select"
                id="exampleFormControlInput1"
                onChange={(e) => setparcelas(e.target.value)}
                value={parcelas}
              >
                <option selected>...</option>
                <option value="1" class="dropdown-item">
                  1
                </option>
                <option value="2 Parcelas" class="dropdown-item">
                  1 DE 2
                </option>
                <option value="3 Parcelas" class="dropdown-item">
                  1 DE 3
                </option>
                <option value="4 Parcelas" class="dropdown-item">
                  1 DE 4
                </option>
                <option value="5 Parcelas" class="dropdown-item">
                  1 DE 5
                </option>
                <option value="6 Parcelas" class="dropdown-item">
                  1 DE 6
                </option>
                <option value="7 Parcelas" class="dropdown-item">
                  1 DE 7
                </option>
                <option value="8 Parcelas" class="dropdown-item">
                  1 DE 8
                </option>
                <option value="9 Parcelas" class="dropdown-item">
                  1 DE 9
                </option>
                <option value="10 Parcelas" class="dropdown-item">
                  1 DE 10
                </option>
                <option value="11 Parcelas" class="dropdown-item">
                  1 DE 11
                </option>
                <option value="12 Parcelas" class="dropdown-item">
                  1 DE 12
                </option>
              </select>
            </div>
            </div>

            <br />

            <div class="row" >
            {/*Campo de TIPO*/}
            <div class="col-6">
              <label>Tipo</label>
              <select
                name="tipo"
                id="tipo"
                class="form-select"
                aria-label="Disabled select example"
                onChange={(e) => settipo(e.target.value)}
              >
                <option selected>...</option>
                <option value="servico" class="dropdown-item">
                  Serviço
                </option>
                <option value="produto" class="dropdown-item">
                  Produto
                </option>
              </select>
            </div>
            {/*Campo de Situação*/}
            <div class="col-6">
              <label>Situação</label>
              <select
                name="situacao"
                id="situacao"
                class="form-select"
                aria-label="Disabled select example"
                onChange={(e) => setsituacao(e.target.value)}
              >
                <option selected>...</option>
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
            </div>
            </div>

            <br />

            <div class="row" >
            {/*Campo de Conta*/}
            <div class="col-md-6">
              {" "}
              <label>Conta</label>
              <input
                type="number"
                name="conta"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="0"
                onChange={(e) => setconta(e.target.value)}
                value={conta}
              />
            </div>
            {/*Campo de Fatura*/}
            <div class="col-6">
              <label>Fatura</label>
              <input
                type="text"
                name="protocolo"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="0"
                onChange={(e) => setprotocolo(e.target.value)}
                value={protocolo}
              />
            </div>
            </div>

            <br />

            {/*Campo de Observação*/}
            <div class="p-2">
              <textarea
                class="form-control p-4"
                aria-label="With textarea"
                placeholder="Digite sua mensagem"
                onChange={(e) => setobserva(e.target.value)}
              ></textarea>
            </div>
            
            <br />
            {/*Botão de Cadastro*/}
            <div class="d-grid gap-2 col-5 mx-auto">
              {" "}
              <button type="submit" class="btn btn-success">
                Cadastrar
              </button>
            </div>
        </form>

        {/*   {user && <div>Response: {JSON.stringify(user)}</div>} {/* Exibe a resposta do servidor */}
        {/* {error && <div>Error: {error}</div>} {/* Exibe qualquer erro */}
      </div>
    </div>
  );
}

export default Cadastrodenota;

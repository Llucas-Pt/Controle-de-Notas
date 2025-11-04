
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Login.css"; // Importe o arquivo CSS personalizado
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Loginimg from "../assets/Login.avif"


function Login() {

  const [email, setemail ] = useState('')
  const [passwd, setpasswd] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  

  const Liberacaodeacesso = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha: passwd }),
        });

        if (!email || !passwd) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return;
        }

        setIsLoading(true); // Ativa o carregamento

        if (!response.ok) {
            const errorData = await response.json();
            setError("Credenciais inválidas");
            setErrorMessage(errorData.message || "Erro ao realizar login.");
            setIsLoading(false); // Desativa o carregamento antes de redirecionar
            return;
        }

        const data = await response.json();

        // Salva o token no localStorage e redireciona
        localStorage.setItem("token", data.token);


        setTimeout(() => {
          setIsLoading(false); // Desativa o carregamento antes de redirecionar
          navigate("/Notas");
         }, 1000);

         
    } catch (error) {
        console.error("Erro na requisição:", error);
        setIsLoading(false); // Desativa o carregamento antes de redirecionar
    }
};


  return (


    <div className="login-container">

      { isLoading ? (

<div id="Loading" class="spinner-border text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
        ) : (


      <div id="LoginForm" >


        <form onSubmit={Liberacaodeacesso}>


        <div class="row" >

        <label id="labelLogin">Email</label>
        <div class="col-md-7">
       
            <input 
              type="email" 
              id="email" 
              class="form-control" 
              placeholder='Usuário'
              onChange={(e) => setemail(e.target.value)}
              value={email}/>
        </div>
     <br />
     <br /> 
     <br />   
        <label id="labelLogin">Password</label>
        <div class= "col-md-7">
          
            <input 
            class="form-control" 
              type="password" 
              id="passwd" 
              placeholder='Password'
              onChange={(e) => setpasswd(e.target.value)}
              value={passwd}
              />
        </div>
        <br />
        <br />
        <br />
        </div>
        <br />

        <div class="d-grid gap-2 col-7">
        {errorMessage && <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>}
        < button type="submit" class= "btn btn-outline-primary" >Sign in </button> <p> <a href=""><Nav.Link href="http://localhost:5173/CadastroUser" id="Criacao"> Create Acount </Nav.Link></a> </p>  
        </div>
           
        </form>
        </div>

  
      )}

  {/* Condicional para exibir a imagem apenas quando não estiver carregando */}
  {!isLoading && (
    <div id="loginimagem">
      <img src={Loginimg} alt="trello" />
    </div>
  )}
</div>
  )}


export default Login
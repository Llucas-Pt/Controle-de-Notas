import React, { useState } from "react";
import "../Css/Cadastro.css";
import Loginimg from "../assets/Login.avif";
import { Nav } from "react-bootstrap";

function CadastroUser() {
  const [cademail, setcademail] = useState("");
  const [cadpasswd, setcadpasswd] = useState("");
  const [cadpasswdois, setcadpasswdois] = useState("");
  const [cadnome, setcadnome] = useState("");
  const [message, setMessage] = useState("");

  const Cadastro = async (e) => {
    e.preventDefault();

    if (cadpasswd === cadpasswdois) {
      try {
        const CdUser = await fetch("http://localhost:3000/cadastrouser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cademail,
            name: cadnome,
            senha: cadpasswd,
          }),
        });

        const data = await CdUser.json();
        alert("Usuário cadastrado com sucesso!");

        if (data.message === "Usuário cadastrado com sucesso!") {
          setMessage(data.message);
          setTimeout(
            () => (window.location.href = "http://localhost:5173/login"),
            2000
          );
        } else {
          setMessage("Erro ao cadastrar usuário: " + data.message);
        }
      } catch (error) {
        setMessage("Erro ao cadastrar usuário: " + error.message);
      }
    } else {
      setMessage("As senhas não coincidem.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="form-container">
        <h2>Create Acount</h2>
        <form onSubmit={Cadastro}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              onChange={(e) => setcademail(e.target.value)}
              value={cademail}
            />
          </div>
          <div>
            <input
              type="text"
              id="cadnome"
              placeholder="Nome"
              onChange={(e) => setcadnome(e.target.value)}
              value={cadnome}
            />
          </div>
          <div>
            <input
              type="password"
              id="password1"
              placeholder="Senha"
              onChange={(e) => setcadpasswd(e.target.value)}
              value={cadpasswd}
            />
          </div>
          <div>
            <input
              type="password"
              id="password2"
              placeholder="Confirmar Senha"
              onChange={(e) => setcadpasswdois(e.target.value)}
              value={cadpasswdois}
            />
          </div>
          <button type="submit" class= "btn btn-outline-primary" >Cadastrar</button>
          <p>
            <span>Já tem uma conta? <Nav.Link href="http://localhost:5173/login" id="jatemconta">Sign in</Nav.Link> </span>
            
          
          </p>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      <div id="loginimagem" className="image-container">
        <img src={Loginimg} alt="Cadastro" />
      </div>
    </div>
  );
}

export default CadastroUser;

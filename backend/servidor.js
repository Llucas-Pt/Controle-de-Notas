const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
/*
app.get("/", (req, res) => {
  res.send("Rodando");
});*/

/*app.get("/filial", (req, res) => {
  res.send("Rodando");
});*/

app.listen(porta, () => {
  console.log(`Servidor rodando na porta: ${porta}`);
});



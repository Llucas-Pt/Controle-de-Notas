const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("controle_de_nt", "root", "senha123", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o Banco realizada com sucesso!");
  })
  .catch((err) => {
    console.log("Não foi possível se conectar com o banco de dado:", err);
  });

module.exports = sequelize;

const express = require("express");
const routes = express.Router();
const {Op, where} = require ("sequelize")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rodadas do salt
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");


const {
  base_de_notas,
  filial,
  controle_fixo,
  controle_variavel,
  usuario,
  liberacao_de_notas,
  notas_mensais,
} = require("./models");
const e = require("express");
const { Console } = require("console");

routes.get("/filial/:Filial_codigo", async (req, res) => {
  const { Filial_codigo } = req.params;

  try {
    // Busca a filial no banco de dados
    // findOne:  Esse é um método do Sequelize que faz uma consulta ao banco de dados e busca um único registro que satisfaça as condições fornecidas.
    const filialtable = await filial.findOne({
      where: { Filial_codigo: Filial_codigo },
    });

   
    // Se a filial não for encontrada, retornar um erro
    if (!filialtable) {
      return res.status(404).json({ message: "Filial não encontrada" });
    }
    // Se encontrada, retornar os dados da filial
    res.status(200).json(filialtable);
  } catch (error) {
    // Em caso de erro na busca, retornar erro do servidor
    console.error("Erro ao buscar a filial:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Post para criar uma nova nota
routes.post("/cadastrarNota", async (req, res) => {

  var {
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
    criado_por,
  } = req.body;

  console.log(req.body);
  // Validação básica
  if (!tiponota || !Filial_codigo) {
    return res.status(400).json({
        message: "Dados inválidos. Tiponota e Filial_id são obrigatórios",
      });
  }

const token = criado_por; // Token recebido do front-end
let userId;

try {
  const decoded = jwt.verify(token, "sua_chave_secreta");
  userId = decoded.id; // Extraímos o id do usuário do token
} catch (err) {
  return res.status(401).json({ message: "Token inválido ou expirado" });
}


let NomeDoCriador
try {
    // Consultar o 'nome' do usuário na tabela 'usuario' com base no 'idusuario' (ou 'email', se preferir)
    const usuariotable = await usuario.findOne({
      where: { idusuario: userId }, // Aqui você usa o 'idusuario' para consultar
    });

    if (!usuariotable) {
      return res.status(404).json({ message: "Usuário não encontrado" });
}


// Pegar o 'nome' do usuário
NomeDoCriador = usuariotable.nome;
console.log(NomeDoCriador)

} catch (e) {
  console.error("Erro ao criar a nota (Variavel):", e);
  res.status(500).json({ message: "Erro interno do servidor" });
}

// Criação da nova entrada no banco de dados

  if (tiponota == "Fixo") {

    try {
      const novaNota = await base_de_notas.create({
        Filial_codigo: Filial_codigo,
        Razao_social: razaosocial,
        Nome_fantasia: nomefantasia,
        Investimento: investimento,
        Fornecedor: fornecedor,
        Pedido: pedido,
        Data_de_emissao: datadeemissao,
        Data_de_vencimento: datavencimento,
        NF_DANFE: NF,
        Protocolo: protocolo,
        ValorUltMes: valormespass,
        ValorMesAtual: valormesatual,
        Parcelas: parcelas,
        Pagamento: pagamento,
        Tipo: tipo,
        Situacao: situacao,
        Conta: conta,
        Observacao: observa,
        Criado_por: NomeDoCriador,
});

      const idBase_de_Notas = novaNota.idBase_de_Notas;

      await controle_fixo.create({
        
        Filial_codigo: Filial_codigo,
        Razao_social: razaosocial,
        Nome_fantasia: nomefantasia,
        Fornecedor: fornecedor,
        Investimento: investimento,
        Data_de_emissao: datadeemissao,
        Data_de_vencimento: datavencimento,
        Nota_fiscal: NF,
        Pedido: pedido,
        Observacao: observa,
        Situacao: situacao,
        Base_de_Notas_idBase_de_Notas: idBase_de_Notas,
      });

      res.status(201).json({
        message: "Nota criada com sucesso!",
        nota: novaNota,
      });
    } catch (e) {
      console.error("Erro ao criar a nota (Mensal):", e);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  } else if (tiponota == "Variavel") {
    try {
      const novaNota = await base_de_notas.create({
        Filial_codigo: Filial_codigo,
        Razao_social: razaosocial,
        Nome_fantasia: nomefantasia,
        Investimento: investimento,
        Fornecedor: fornecedor,
        Pedido: pedido,
        Data_de_emissao: datadeemissao,
        Data_de_vencimento: datavencimento,
        NF_DANFE: NF,
        Protocolo: protocolo,
        ValorUltMes: valormespass,
        ValorMesAtual: valormesatual,
        Parcelas: parcelas,
        Pagamento: pagamento,
        Tipo: tipo,
        Situacao: situacao,
        Conta: conta,
        Observacao: observa,
        Criado_por: NomeDoCriador,
      });

      const idBase_de_Notas = novaNota.idBase_de_Notas;

      await controle_variavel.create({
        Filial_codigo: Filial_codigo,
        Razao_social: razaosocial,
        Nome_fantasia: nomefantasia,
        Fornecedor: fornecedor,
        Investimento: investimento,
        Data_de_emissao: datadeemissao,
        Data_de_vencimento: datavencimento,
        Nota_fiscal: NF,
        Pedido: pedido,
        Observacao: observa,
        Situacao: situacao,
        Base_de_Notas_idBase_de_Notas: idBase_de_Notas,
      });

      res.status(201).json({
        message: "Nota criada com sucesso!",
        nota: novaNota,
      });
    } catch (e) {
      console.error("Erro ao criar a nota (Variavel):", e);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
});

routes.get("/notas" , async (req,res) =>{

  const {consulta} = req.query; 

  console.log(consulta)
  
  try {

    const BaseDeNotas = await notas_mensais.findAll({
    attributes: ['filial', 'idnotas_mensais','fornecedor', 'investimento', 'data_emissao', 'data_vencimento', 'observacao', 'pedido', 'nota_fiscal', 'situacao'],
      where: {
        fornecedor: {
          [Op.like]: consulta,
        }, 
    },

  });
    
    if (BaseDeNotas.length === 0) {
      return res.status(404).json({ message: "Nenhum registro foi localizado" });
    }

    res.status(200).json(BaseDeNotas);

  } catch (error) {
    console.error("Erro ao buscar as filiais:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

routes.get("/situacaonotas" , async (req,res) =>{

  const {startDate, endDate } = req.query; 

  
  try {

    const BaseDeNotas = await base_de_notas.findAll({
    attributes: ['Filial_codigo', 'idBase_de_Notas', 'Nome_fantasia', 'Fornecedor', 'Investimento', 'Data_de_emissao', 'Data_de_vencimento', 'Pedido', 'NF_DANFE', 'Situacao','Pagamento', 'Observacao'],
      where: {
        Fornecedor: {
          [Op.like]: endDate,
        },
        NF_DANFE: {
          [Op.gte]: startDate,
      }  
    },


  });
    
    if (BaseDeNotas.length === 0) {
      return res.status(404).json({ message: "Nenhum registro foi localizado" });
    }

    res.status(200).json(BaseDeNotas);

  } catch (error) {
    console.error("Erro ao buscar as filiais:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});


routes.put("/atualizacao/:idBase_de_Notas", async (req, res) => {
  const { idBase_de_Notas } = req.params;
  const { Situacao, Data_de_emissao } = req.body;

  console.log(Situacao, Data_de_emissao)

  try {
    const nota = await base_de_notas.findByPk(idBase_de_Notas);
    if (!nota) {
      return res.status(404).json({ message: "Nota não encontrada" });
    }

    // Atualiza a situação
    nota.Situacao = Situacao;
    await nota.save();

    res.status(200).json({ message: "Situação atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar situação:", error);
    res.status(500).json({ message: "Erro ao atualizar a situação" });
  }
});


routes.post("/cadastrouser", async (req, res) => { 
try { 
const { name, email, senha } = req.body;

  // Criptografar senha antes de salvar
  const hashedPassword = bcrypt.hashSync(senha, saltRounds);
  console.log(hashedPassword);
  console.log(name, email, senha)

    //Criação do usuário
    const user = await usuario.create({
      nome : name,
      email : email,
      senha: hashedPassword
    })

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      nota: user,
    });
    

  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao registrar o usuário.')
  }

})


//Função para gerar token
const geradordeToken = (idusuario) => {
  return  jwt.sign({ id:idusuario}, "sua_chave_secreta",{ expiresIn: "1h"})
}


routes.post("/login", async (req, res) => {

    const {email, senha } = req.body;
    console.log(senha)

    try {
        // Verificar se o usuário existe
        const user = await usuario.findOne({ where: {email}})

        if (!user) return res.status(401).json({ message: "Usuário não encontrado." });

        // Verificar a senha com bcrypt 
        const ispasswdvalido = await bcrypt.compare(senha, user.senha)
        if (!ispasswdvalido) return res.status(401).json({ message: "Senha Invalida" });

         // Gerar o token JWT
        const token = geradordeToken(user.idusuario);
         res.status(200).json({ auth: true, token });

    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao realizar login.");
      
    }
} )



routes.get("/liberar", async(req,res) => {

const {notafiscal, fornecedor} = req.query; 


try {
 const liberandonota = await base_de_notas.findAll({
  attributes:['Filial_codigo', 'idBase_de_Notas', 'Razao_social','Nome_fantasia', 'Fornecedor', 'Investimento', 'ValorMesAtual', 'ValorUltMes','Data_de_emissao','Data_de_vencimento', 'Pedido', 'NF_DANFE', 'Situacao','Pagamento','Observacao'],
  where: {
      Fornecedor: fornecedor,
      NF_DANFE: notafiscal,
      },
 })





 if (liberandonota.length === 0) {
  console.log(notafiscal, fornecedor)
  return res.status(404).json({ message: "Nenhum registro foi localizado" });
}

res.status(200).json(liberandonota);
  
} catch (error) {
  console.error("Erro ao buscar as filiais:", error);
  res.status(500).json({ message: "Erro interno do servidor" });
}
})


routes.post("/exportar", async (req, res) => {
  const { dados,data, empresa } = req.body;


  try {
    if (!Array.isArray(dados)) {
      return res.status(400).json({ message: "Formato inválido: 'dados' deve ser um array." });
    }

      
    for (const dado of dados) {
      const Liberacaoimport = await liberacao_de_notas.create({
        Filial_codigo: dado.Filial_codigo,
        Razao_social: dado.Razao_social,
        Nome_fantasia: dado.Nome_fantasia,
        Investimento: dado.Investimento,
        Fornecedor: dado.Fornecedor,
        Pedido: dado.Pedido,
        ValorUltMes: dado.ValorUltMes,
        ValorMesAtual: dado.ValorMesAtual,
        NF_DANFE: dado.NF_DANFE,
        Data_de_vencimento: dado.Data_de_vencimento,
        Observacao: dado.Observacao,
      });
    }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Relatório");

    // Estilos globais
  const headerStyle = {
      font: { bold: true, color: { argb: "000000" } },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true  },
      font :{name: "Calibri", size: 13, bold: true },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" }, // Branco
      },

      
  };


  const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
  };

    // Configuração da largura das colunas
    sheet.columns = [
      { header: "Item", key: "Filial_codigo", width: 15 },
      { header: "Filial Código", key: "Filial_codigo", width: 15 },
      { header: "Fornecedor", key: "Fornecedor", width: 30 },
      { header: "Investimento", key: "Investimento", width: 15 },
      { header: "Pedido", key: "Pedido", width: 15 },
      { header: "Valor Mês Atual", key: "ValorMesAtual", width: 20 },
      { header: "Valor Último Mês", key: "ValorUltMes", width: 20 },
      { header: "NF DANFE", key: "NF_DANFE", width: 20 },
      { header: "Observação", key: "Observacao", width: 50 },
    ];

    // Cabeçalho customizado
    sheet.mergeCells("A1:I1");
    sheet.getCell("A1").value = "";
    sheet.getCell("A1").alignment = { horizontal: "center"};
    sheet.getCell("A1").font = {name: "Calibri", size: 13, bold: true };
    sheet.getCell("A1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "000000" }, // Fundo azul claro
    };


    sheet.mergeCells("A2:I2");
    sheet.getCell("A2").value = `EMPRESA: ${empresa}`  ;
    sheet.getCell("A2").alignment = { horizontal: "center"};
    sheet.getCell("A2").font = {name: "Calibri", size: 13, bold: true };
    sheet.getCell("A2").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "000000" }, // Fundo azul claro
    };

    sheet.mergeCells("A3:I3");
    sheet.getRow(3).height = 40;
    const dataFormatada = dayjs(data).format("DD/MM/YYYY");
    sheet.getCell("A3").value = `LIBERAÇÃO DE PEDIDOS - DATA DE ENTREGA ${dataFormatada}`;
    sheet.getCell("A3").alignment = {  vertical: 'middle', horizontal: "center"};
    sheet.getCell("A3").font = {name: "Calibri", size: 13, bold: true };
    sheet.getCell("A3").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "000000" }, // Fundo azul claro
    };

    sheet.mergeCells("A4:I4");
    sheet.getRow(4);
    sheet.getCell("A4").value = ``;
    sheet.getCell("A4").alignment = {  vertical: 'middle', horizontal: "center"};
    sheet.getCell("A4").font = {name: "Calibri", size: 13, bold: true };
    sheet.getCell("A4").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFF" }, // Fundo azul claro
    };

    // Cabeçalhos das colunas
    const headerRow = sheet.getRow(5);
    headerRow.values = [
      "Item",
      "Filial Código",
      "Fornecedor",
      "Investimento",
      "Pedido",
      "Valor Mês Atual",
      "Valor Último Mês",
      "NF DANFE",
      "Observação",
    ];
    headerRow.eachCell((cell) => {
      Object.assign(cell, headerStyle);
      cell.border = borderStyle;
    });

    // Inserindo os dados
    dados.forEach((linha, index) => {
      const rowIndex = index + 6;
      const row = sheet.getRow(rowIndex);

      row.values = [
        linha.Item,
        linha.Filial_codigo,
        linha.Fornecedor,
        linha.Investimento,
        linha.Pedido,
        linha.ValorMesAtual,
        linha.ValorUltMes,
        linha.NF_DANFE,
        linha.Observacao,
      ];


      // Estilo alternado
      const fillColor = rowIndex % 2 === 0 ? "FFFFFF" : "FFFFFF"; // Linhas pares e ímpares
      row.eachCell((cell) => {
        cell.border = borderStyle;
        row.alignment = {  vertical: 'middle', horizontal: "center", wrapText: true};
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: fillColor },
        };
      });
    });



    // Ajustando a altura das linhas
    sheet.getRow(6).height = 20; // Altura do cabeçalho
    dados.forEach((_, index) => sheet.getRow(index + 5).height = 18);



    // Salvando o arquivo
  const filePath = path.join(__dirname, "Relatorio.xlsx");
  await workbook.xlsx.writeFile(filePath);

    res.download(filePath, "Relatorio.xlsx", (err) => {
      if (err) {
        console.error("Erro ao enviar o arquivo:", err);
        res.status(500).json({ message: "Erro ao enviar o arquivo" });
      }
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("Erro ao exportar dados:", error);
    res.status(500).json({ message: "Erro ao exportar dados" });
  }



});

routes.get("/api/notas", async (req, res) => {

const limit = 14;

try {
    const notas = await notas_mensais.findAll({
      limit:limit,
    });
    

    res.status(200).json(notas);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar as notas" });
}

}) 

routes.get("/api/notas/:page", async (req, res) => {
  const limit = 14; // Número de itens por página
  const page = parseInt(req.params.page) || 1; // Pega o parâmetro 'page' da URL ou assume 1 como padrão
  const offset = (page - 1) * limit; // Calcula o offset com base na página

  try {
    const notas = await notas_mensais.findAll({
      offset: offset,
      limit: limit,
    });

    res.status(200).json(notas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar as notas" });
  }
});

 module.exports = routes;


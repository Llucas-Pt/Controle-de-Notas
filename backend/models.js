///o models.js deve conter todas as definições de tabelas que você precisa para a aplicação, independentemente do tipo de requisição que você planeja fazer

const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");

//Tabela Base de Notas
const base_de_notas = sequelize.define("base_de_notas", {
  idBase_de_Notas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Filial_codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Razao_social: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Nome_fantasia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Investimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Fornecedor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Data_de_emissao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Data_de_vencimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  NF_DANFE: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Protocolo: {
    type: DataTypes.STRING,
  },
  ValorMesAtual: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ValorUltMes: {
    type: DataTypes.FLOAT,
  },
  Parcelas: {
    type: DataTypes.STRING,
  },
 
  Pagamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Situacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Conta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Criado_por: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Observacao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

//Tabela Filial
const filial = sequelize.define(
  "filial",
  {
    idBase_filial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filial_codigo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Razao_social: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Nome_fantasia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CNPJ: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    Municipio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Estado: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
  },
  {
    tableName: "filial", // Adiciona o nome da tabela que deseja usar
  }
);

const controle_fixo = sequelize.define(
  "Controle_fixo",
  {
    Controle_fixo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filial_codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Razao_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nome_fantasia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fornecedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Investimento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Data_de_emissao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Data_de_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Nota_fiscal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Observacao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Situacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Base_de_Notas_idBase_de_Notas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "controle_fixo",
  }
);

const controle_variavel = sequelize.define(
  "controle_variavel",
  {
    Controle_variavel: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filial_codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Razao_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nome_fantasia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fornecedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Investimento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Data_de_emissao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Data_de_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Nota_fiscal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Observacao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Situacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Base_de_Notas_idBase_de_Notas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "controle_variavel",
  }
);

const liberacao_de_notas = sequelize.define(
  "liberacao_de_notas",
  {
    liberacao_notas_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    Filial_codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Razao_social: {
      type: DataTypes.STRING(99),
      allowNull: false,
    },
    Nome_fantasia: {
      type: DataTypes.STRING(99),
      allowNull: false,
    },
    Investimento: {
      type: DataTypes.STRING(99),
      allowNull: false,
    },
    Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    ValorMesAtual: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ValorMePass: {
      type: DataTypes.FLOAT,
    },
    NF_DANFE: {
      type: DataTypes.STRING(99),
      allowNull: false,
    },
    Data_de_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Observacao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: "liberacao_de_notas",
    timestamps: false, // Não há campos createdAt e updatedAt na tabela
});

const usuario = sequelize.define(
  "usuario",
  {
    idusuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(99),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(99),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    token_recuperacao: {
      type: DataTypes.STRING(99),
      allowNull: true,
    },
    permissoes: {
      type: DataTypes.ENUM("admin", "usuario"),
      allowNull: true,
    },
    base_de_notas_idBase_de_Notas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: "usuario",
    timestamps: false, // Não há campos createdAt e updatedAt na tabela
  });

  const notas_mensais = sequelize.define(
    "notas_mensais",
    {
      idnotas_mensais: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      filial: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fornecedor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      investimento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_emissao: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      data_vencimento: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pedido: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nota_fiscal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      situacao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      observacao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mes_referencia: {
        type: DataTypes.DATE, // Ou STRING se preferir
        allowNull: false,
      },
    },
    {
      tableName: "notas_mensais", timestamps: false,// Nome correto da tabela
    }
  );

  
  // Exportação
  module.exports = { notas_mensais, base_de_notas, filial, controle_fixo, controle_variavel, usuario, liberacao_de_notas, };
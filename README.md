

# Controle de Notas 📝💼

Controle de Notas é um sistema para gerenciar notas fiscais mensais, permitindo cadastro, atualização, consulta e exportação de forma prática e centralizada, desenvolvido com React, Node.js e MySQL.

Principais vantagens:

* **Controle centralizado:** Todas as notas em um único painel.
* **Atualização automática:** Situação das notas refletida em tempo real.
* **Exportação e importação:** Facilita relatórios e integração de dados.
* **Segurança:** Acesso restrito via login de usuário.

---

## Tecnologias Utilizadas

* **Back-end:** Node.js, Express
* **Front-end:** React
* **Banco de Dados:** MySQL
* **Bibliotecas auxiliares:** Sequelize (ORM), bibliotecas para exportação em Excel
* **Controle de versões:** Git/GitHub

Perfeito! Aqui está a **seção Funcionalidades** totalmente organizada com os nomes que você indicou:

---

## Funcionalidades

### 1️⃣ Login

* Usuário acessa o sistema através de **login com usuário e senha**.
* Apenas usuários autenticados podem acessar as demais funcionalidades.
* Garante segurança e controle de acesso.

<img src="https://github.com/Llucas-Pt/Controle-de-Notas/blob/main/frontend/Gif/Login.gif" width="480"/>

### 2️⃣ Dashboard

* Exibe todas as notas fixas do mês.
* Atualiza automaticamente a situação das notas quando modificadas.
* Dashboard para facilitar visualização do gasto mensal.

<img src="https://github.com/Llucas-Pt/Controle-de-Notas/blob/main/frontend/Gif/Dashboard.gif" width="480"/>

### 3️⃣ Situação das Notas

* Consulta detalhada da situação de cada nota:
* Filial, Fornecedor, Data de Emissão, Data de Vencimento, Situação e Observação.
* Requisição **PUT** para atualizar a situação da nota.


<img src="https://github.com/Llucas-Pt/Controle-de-Notas/blob/main/frontend/Gif/SituaçãoDaNota.gif" width="480"/>


### 4️⃣ Cadastro da Nota

* Cadastro completo de novas notas no sistema via **POST**.
* Campos de cadastro:
  * Tipo de Nota, Código Filial, Empresa, Razão Social, Investimento, Fornecedor, Pedido
  * Data de Emissão, Data de Vencimento, Nota Fiscal, Protocolo
  * Valor do mês passado, Valor do mês atual, Parcelas
  * Pagamento, Tipo, Situação, Conta, Observação
    

<img src="https://github.com/Llucas-Pt/Controle-de-Notas/blob/main/frontend/Gif/CadastroDaNota.gif" width="480"/>


### 5️⃣ Exportação das Notas

* Consulta de notas filtrando por **data** e **filial**.
* Exportação dos dados em **arquivo Excel**.
* Utiliza biblioteca específica para gerar o Excel.


<img src="https://github.com/Llucas-Pt/Controle-de-Notas/blob/main/frontend/Gif/Exportacao.gif" width="480"/>


### 6️⃣ Importação das Notas

* Possibilidade de importar notas através de arquivos externos (CSV/Excel).
* Automatiza o cadastro de múltiplas notas.
* Atualiza o banco de dados com os dados importados.


<img src="https://github.com/Llucas-Pt/Controle-de-Notas/blob/main/frontend/Gif/Importacao.gif" width="480"/>

---

## Fluxo do Sistema

1. Usuário acessa **Dashboard** → visualiza todas as notas e situação geral.  
2. Usuário acessa **Notas** → filtra por data → atualiza situação das notas pendentes.  
3. Usuário acessa **Situação da Nota** → consulta detalhes → atualiza situação se necessário.  
4. Usuário acessa **Cadastro de Notas** → adiciona novas notas com todos os dados.  
5. Usuário acessa **Liberação de Notas** → filtra por data e filial → exporta em Excel.

---

## Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/Llucas-Pt/Controle-de-Notas.git
````

2. **Back-end:**

```bash
cd backend
npm install
npm dev
```

3. **Front-end:**

```bash
cd frontend
npm create vite@latest
npm install
npm dev
```

> O front-end será executado em `http://localhost:3000`
> O back-end será executado em `http://localhost:5000` (ou porta configurada)

---

## Observações

* Para a geração de arquivos Excel, é utilizada uma biblioteca específica que permite exportar os dados filtrados por data e filial.
* As alterações nas notas são refletidas automaticamente no Dashboard.
* O sistema permite manter controle histórico das notas por mês.

---

## Autor

**Lucas Vicente**



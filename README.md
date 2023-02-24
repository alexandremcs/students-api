![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

#  Students API
- [Descrição](#descrição-do-projeto)
- [Status do Projeto](#status-do-projeto)
- [Funcionalidades](#⚙️-funcionalidades)
- [Como executar o projeto](#🚀-como-executar-o-projeto)
- [Tecnologias](#🛠-tecnologias)

##  Descrição do Projeto

Aplicação back-end com os métodos HTTP *get, post, put e delete* e integração com o banco de dados SQLite. Utilizando o Node.js com Express e o SQLite, o projeto consiste em uma **API RESTful** com as funções de CRUD em um cadastro de alunos além de autenticação com JWT, criptografia de senhas com Bcrypt e geração de logs de acesso com Winston.

##  Status do Projeto

![Badge Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDO&color=green&style=for-the-badge)

##  ⚙️ Funcionalidades
- Create
- Read
- Update
- Delete
- Integração com o SQLite
- Criptografia de senhas com o Bcrypt
- Autenticação com JWT
- Geração de logs de acesso com Winston
- Variáveis de ambiente com Dotenv;
- Paginação do lado do servidor

## Aplicação rodando no Postman
- Cadastro de usuários (Método POST)

![Print1](https://raw.githubusercontent.com/alexandremcs/students-api/main/assets/images/print1.png)

- Login de usuário (Método POST)

![Print2](https://raw.githubusercontent.com/alexandremcs/students-api/main/assets/images/print2.png)

- Listagem de alunos (Método GET - Autenticado)

![Print3](https://raw.githubusercontent.com/alexandremcs/students-api/main/assets/images/print3.png)

##  🚀 Como executar o projeto

```bash

# Clone este repositório

$ git clone https://github.com/alexandremcs/students-api.git

# Acesse a pasta do projeto no seu terminal/cmd

$ cd students-api

# Instale as dependências

$ npm install

# Criar um arquivo .env na raiz do projeto com as seguintes variáveis:

STUDENT_PAGE_SIZE = X (Tamanho máximo de estudantes por página)
USER_PAGE_SIZE = X (Tamanho máximo de usuários por página)
SECRET_KEY = X (Chave secreta para criptografar e descriptografar senhas)
REFRESH_SECRET_KEY = X (Chave secreta utilizada na revalidação de tokens)
EXPIRES_IN = X (Tempo, em segundos, do tempo de expiração dos tokens de acesso)

# Execute a aplicação em modo de desenvolvimento

$ npm run dev

# A aplicação ficará acessível na porta:3000
A aplicação poderá ser testada com aplicativos de teste de API como o Postman (link abaixo).

```
#### * Baixe o Postman:  [ Postman ](https://www.postman.com/)

##  🛠 Tecnologias

Ferramentas utilizadas no projeto:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Postman](https://www.postman.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [Winston](https://www.npmjs.com/package/winston)

## Projeto Node.js com Sequelize e MySQL
Este projeto faz parte de uma atividade do curso Desenvolvedor Web Full Stack. Ele oferece uma API para gerenciar usuários e categorias com operações CRUD completas. A API usa autenticação JWT e tem testes automatizados. O projeto segue o padrão MVC e utiliza o Sequelize para interação com o banco de dados

## Estrutura do Projeto

```
project-root/
├── src/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── user.js
│   │   └── category.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Category.js
│   └── routes/
│       ├── user.js
│       └── category.js
├── tests/
│   ├── user.test.js
│   └── category.test.js
├── .env
├── .gitignore
├── package-lock.json
└── package.json
```


# Rafa Bank - Aplicativo de Controle Financeiro

Um aplicativo web para gerenciamento de finanças pessoais, permitindo registrar transações financeiras (entradas e saídas) e visualizar um dashboard com saldo total.

## Tecnologias Utilizadas

### Backend
- TypeScript
- Node.js com Express
- PostgreSQL
- Prisma ORM

### Frontend
- TypeScript
- React
- Tailwind CSS
- Axios

## Estrutura do Projeto

O projeto está organizado em duas pastas principais:

- `backend`: API RESTful para gerenciamento de transações (executa na porta 3000)
- `frontend`: Interface de usuário em React (executa na porta 3001)

## Requisitos

- Node.js (v14+)
- PostgreSQL

## Configuração e Instalação

Para facilitar a instalação, você pode executar na raiz do projeto:

```bash
# Instalar todas as dependências (root, backend e frontend)
npm run install:all

# OU instalar manualmente em cada pasta
```

### Banco de Dados

1. Crie um banco de dados PostgreSQL chamado `rafa_bank`
2. Configure as credenciais no arquivo `.env` do backend:
```
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/rafa_bank?schema=public"
PORT=3000
```

### Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Instalar tipos necessários (importante para evitar erros de tipagem)
npm install --save-dev @types/express @types/cors @types/node

# Gerar cliente Prisma
npm run prisma:generate

# Executar migrações do banco de dados
npm run prisma:migrate

# Iniciar servidor de desenvolvimento
npm run dev
```

### Frontend

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (rodará na porta 3001)
npm start
```

### Rodando o projeto completo

Na raiz do projeto, você pode executar o backend e o frontend simultaneamente:

```bash
npm run dev
```

## Informações sobre Portas

- **Backend**: Executa na porta 3000 (http://localhost:3000)
- **Frontend**: Executa na porta 3001 (http://localhost:3001)

Se precisar alterar essas portas:
1. Para o backend, modifique o arquivo `.env` na pasta backend
2. Para o frontend, modifique o arquivo `.env` na pasta frontend

## Solução de Problemas Comuns

### Conflito de Portas

Se receber erro de "Something is already running on port XXXX":

1. Verifique se não há outros serviços rodando nas portas 3000 ou 3001
2. Você pode usar os seguintes comandos para verificar e matar processos usando essas portas:

**Windows:**
```
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```
lsof -i :3000
kill -9 <PID>
```

### Erros de Tipos no Backend

Se você encontrar erros de tipagem no backend:

```bash
cd backend
npm install --save-dev @types/express @types/cors @types/node
```

### Problemas no Banco de Dados

1. Verifique se o PostgreSQL está rodando
2. Confirme se as credenciais no arquivo `.env` estão corretas
3. Se necessário, recrie o banco de dados:
   ```bash
   cd backend
   npx prisma migrate reset
   ```

### Problemas no Frontend

Se encontrar erros no frontend:

```bash
cd frontend
npm install
npm run build
```

## Funcionalidades

- Registro de transações (entradas e saídas)
- Visualização de saldo total
- Listagem de transações recentes
- Interface moderna com tema escuro

## Rotas da API

- `GET /api/dashboard`: Retorna o saldo total e transações recentes
- `GET /api/transactions`: Retorna todas as transações
- `POST /api/transactions`: Cria uma nova transação

## Melhorias Futuras

- Autenticação de usuários
- Filtros por data e categoria
- Gráficos de gastos por categoria
- Exportação de relatórios 
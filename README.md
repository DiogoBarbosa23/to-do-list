# To-Do List

## Descrição da Atividade
Esta atividade consiste na implementação de um **CRUD simples orientado a serviços** usando **Node.js, Express e React**. O objetivo era criar uma aplicação que consumisse uma API para gerenciar uma lista de tarefas, permitindo criar, ler, atualizar e deletar tarefas.

---

## Tecnologias Utilizadas
- **Node.js**: servidor backend
- **Express**: framework para criação de rotas e API
- **React**: frontend interativo
- **Fetch API**: comunicação frontend ↔ backend
- **CORS**: para permitir comunicação entre frontend e backend em portas diferentes

---

## Funcionalidades
- **Adicionar tarefa**: criar novas tarefas
- **Listar tarefas**: visualizar todas as tarefas cadastradas
- **Marcar como concluída**: clicar em uma tarefa para marcar/desmarcar como concluída
- **Deletar tarefa**: remover tarefas da lista
- **Persistência em memória**: enquanto o backend estiver rodando, as tarefas permanecem ativas

---

## Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- [Git](https://git-scm.com/) instalado

### Passo 1: Clonar o repositório

git clone https://github.com/DiogoBarbosa23/to-do-list.git

No terminal:

```bash

cd to-do-list


Passo 2: Rodar o backend:


cd backend
npm install
node index.js

O backend estará rodando em http://localhost:3000.


Passo 3: Rodar o frontend

Abra outro terminal:

cd frontend
npm install
npm run dev

Abra o navegador no endereço que aparecer no terminal (geralmente http://localhost:5173/)


As tarefas são armazenadas em memória, ou seja, se o backend for reiniciado, todas as tarefas são perdidas.

O frontend está conectado à API do backend via fetch, respeitando as rotas:

GET /tarefas → listar tarefas

POST /tarefas → adicionar tarefa

PUT /tarefas/:id → atualizar tarefa

DELETE /tarefas/:id → deletar tarefa

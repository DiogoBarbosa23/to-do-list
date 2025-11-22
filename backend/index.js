const express = require('express');
const cors = require('cors'); // <--- importando o CORS
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // <--- habilitando CORS para todas as rotas

// Array para guardar as tarefas
let tarefas = [];
let idAtual = 1;

// Rota para listar todas as tarefas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

// Rota para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ erro: 'O título da tarefa é obrigatório.' });
  }
  const tarefa = { id: idAtual++, titulo, concluida: false };
  tarefas.push(tarefa);
  res.status(201).json(tarefa);
});

// Rota para atualizar uma tarefa (ex: marcar como concluída)
app.put('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }
  const { titulo, concluida } = req.body;
  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;
  res.json(tarefa);
});

// Rota para deletar uma tarefa
app.delete('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }
  tarefas.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

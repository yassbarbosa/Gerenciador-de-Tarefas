const express = require('express');
const mongoose = require('mongoose');
const tarefasRouter = require('./rotas');

const app = express();
const PORT = process.env.PORT || 3000; // Porta que vai rodar o servidor/backend

app.use(express.json()); // Middleware que permite receber JSON no corpo das requisições

mongoose.connect('mongodb://localhost:27017/tarefasdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch((err) => console.error('Erro ao conectar no MongoDB: ', err));

app.use('/tarefas', tarefasRouter);

app.get('/', (req, res) => {
  res.send('API de tarefas rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

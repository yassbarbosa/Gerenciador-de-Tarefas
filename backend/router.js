/* Aqui basicamente é só definir as rotas que serão usadas e chamdas no frontend */

const express = require('express');
const router = express.Router();
const Tarefa = require('./model');

router.get('/listar', async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  }
  catch (err) {
    res.status(500).json({ message: 'Erro ao listar as tarefas!' });
  }
});


router.post('/criar', async (req, res) => {
  const { titulo, descricao } = req.body;

  try {
    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ message: 'Título é obrigatório!' });
    }

    const novaTarefa = new Tarefa({titulo, descricao});
    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  }
  catch (err) {
    res.status(400).json({ message: 'Erro ao criar uma nova tarefa!' });
  }
});


router.put('/atualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status } = req.body;

  try {
    const atualizar = {};
    if (titulo !== undefined) atualizar.titulo = titulo;
    if (descricao !== undefined) atualizar.descricao = descricao;
    if (status !== undefined) atualizar.status = status;

    const tarefa = await Tarefa.findByIdAndUpdate(id, atualizar, { new: true });

    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada!' });
    }

    res.json(tarefa);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar tarefa!' });
  }
});


router.delete('/excluir/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await Tarefa.findByIdAndDelete(id);

    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada!' });
    }

    res.json({ message: 'Tarefa excluída com sucesso!' });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao excluir tarefa.' });
  }
});

module.exports = router;

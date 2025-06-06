/* Basicamente no model importamos o mongoose e criamos o modelo da collection
e exportamos esse modelo para poder usar em outros arquivos */

const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    default: 'Pendente',
    enum: ['Pendente', 'Em Desenvolvimento', 'Concluída'],
    trim: true
  },
  horario_de_criacao: {
    type: Date,
    default: Date.now
  }
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;

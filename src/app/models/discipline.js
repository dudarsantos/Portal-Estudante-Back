const mongoose = require('../../database');

const DisciplineSchema = new mongoose.Schema({
  discipline: {
    type: String,
    required: true,
    unique: true
  },
  teacher: {
    type: String,
    required: true
  },
  students: {
    type: String,
    required: true
  }
});

const Discipline = mongoose.model('Discipline', DisciplineSchema);

module.exports = Discipline;
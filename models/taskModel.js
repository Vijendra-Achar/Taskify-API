const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
  },
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;

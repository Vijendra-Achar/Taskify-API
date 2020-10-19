const mongoose = require('mongoose');

const taskNotesSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  notes: {
    type: String,
  },
  taskId: mongoose.Schema.ObjectId,
});

const taskNotesModel = mongoose.model('taskNotes', taskNotesSchema);

module.exports = taskNotesModel;

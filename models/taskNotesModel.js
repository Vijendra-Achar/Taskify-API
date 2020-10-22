const mongoose = require('mongoose');

const taskNotesSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
    },
    notes: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    taskId: {
      type: mongoose.Schema.ObjectId,
      ref: 'task',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

taskNotesSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'taskId',
  });
  next();
});

const taskNotesModel = mongoose.model('taskNotes', taskNotesSchema);

module.exports = taskNotesModel;

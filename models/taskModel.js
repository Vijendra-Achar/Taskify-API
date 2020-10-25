const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
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
    allStages: {
      type: String,
      enum: ['start', 'begun', 'intermediate', 'finished'],
      default: 'start',
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
    assignedTo: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'createdBy',
  }).populate({
    path: 'assignedTo',
  });
  next();
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;

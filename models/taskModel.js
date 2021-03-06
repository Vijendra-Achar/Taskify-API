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
    percentageOfCompletion: {
      type: Number,
      min: 0,
      max: [100, 'The Percentage value should be below hundred'],
      default: 0,
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

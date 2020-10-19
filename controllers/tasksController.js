const taskModel = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tasks: 'All the Tasks',
    },
  });
};

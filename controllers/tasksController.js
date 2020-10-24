const { mongo } = require('mongoose');
const taskModel = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  const allTasks = await taskModel.find();

  res.status(200).json({
    status: 'success',
    data: {
      tasks: allTasks,
    },
  });
};

exports.createTasks = async (req, res) => {
  try {
    const newTask = await taskModel.create({
      title: req.body.title,
      description: req.body.description,
      deadline: new Date(req.body.deadline),
      createdBy: req.params.createdBy,
      totalStages: req.params.totalStages,
      assignedTo: req.params.assignedTo,
    });

    res.status(200).json({
      status: 'success',
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};

exports.getTasksAssignedToMe = async (req, res) => {
  try {
    const theTasks = await taskModel.find({ assignedTo: req.params.myUid });

    res.status(200).json({
      status: 'success',
      results: theTasks.length,
      data: {
        tasks: theTasks,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};

exports.getTasksCreatedByMe = async (req, res) => {
  try {
    const theTasks = await taskModel.find({ createdBy: req.params.myUid });

    res.status(200).json({
      status: 'success',
      results: theTasks.length,
      data: {
        tasks: theTasks,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};

exports.getOneTaskById = async (req, res) => {
  try {
    const theTask = await taskModel.findOne({ _id: req.params.taskId });

    res.status(200).json({
      status: 'success',
      data: {
        tasks: theTask,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};

exports.changeTaskStatus = async (req, res) => {
  try {
    const taskToUpdate = await taskModel.findOneAndUpdate(
      { _id: req.params.taskId },
      { completed: req.body.completed },
    );

    res.status(200).json({
      status: 'success',
      data: {
        taskNote: 'Done',
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};

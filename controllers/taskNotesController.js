const taskModel = require('../models/taskModel');
const taskNotesModel = require('../models/taskNotesModel');

exports.getAllNotes = async (req, res) => {
  try {
    const allTasks = await taskNotesModel.find({ taskId: req.params.taskId });

    res.status(200).json({
      status: 'success',
      results: allTasks.length,
      data: {
        taskNotes: allTasks,
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

exports.createNewNote = async (req, res) => {
  try {
    const newTaskNote = await taskNotesModel.create({
      heading: req.body.heading,
      notes: req.body.notes,
      taskId: req.params.taskId,
      writtenBy: req.body.writtenBy,
    });

    res.status(200).json({
      status: 'success',
      data: {
        taskNote: newTaskNote,
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

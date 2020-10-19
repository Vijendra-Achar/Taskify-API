const taskNotesModel = require('../models/taskNotesModel');

exports.getAllNotes = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      taskNotes: 'All the Notes',
    },
  });
};

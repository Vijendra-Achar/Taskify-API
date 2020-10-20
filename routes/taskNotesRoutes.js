const express = require('express');
const taskNotesController = require('../controllers/taskNotesController');

const router = express.Router();

router.route('/allTaskNotes/:taskId').get(taskNotesController.getAllNotes);

router.route('/createNewNote/:taskId').post(taskNotesController.createNewNote);

module.exports = router;

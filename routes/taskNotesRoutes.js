const taskNotesModel = require('../models/taskNotesModel');
const taskNotesController = require('../controllers/taskNotesController');

const express = require('express');

const router = express.Router();

router.route('/allTaskNotes').get(taskNotesController.getAllNotes);

module.exports = router;

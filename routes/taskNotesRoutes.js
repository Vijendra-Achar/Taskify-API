const express = require('express');
const taskNotesController = require('../controllers/taskNotesController');

const router = express.Router();

router.route('/allTaskNotes').get(taskNotesController.getAllNotes);

module.exports = router;

const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.route('/getAllTasks').get(tasksController.getAllTasks);
router.route('/getMyTasks/:myUid').get(tasksController.getTasksAssignedToMe);

router.route('/createTask/:createdBy/:assignedTo').post(tasksController.createTasks);

module.exports = router;

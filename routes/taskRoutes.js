const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.route('/getAllTasks').get(tasksController.getAllTasks);
router.route('/getMyTasks/:myUid').get(tasksController.getTasksAssignedToMe);
router.route('/getTasksCreatedByMe/:myUid').get(tasksController.getTasksCreatedByMe);

router.route('/getOnetaskById/:taskId').get(tasksController.getOneTaskById);

router.route('/createTask/:createdBy/:assignedTo').post(tasksController.createTasks);

router.route('/changeTaskStatus/:taskId').patch(tasksController.changeTaskStatus);

module.exports = router;

const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

router.route('/task')			
    .get(tasksController.getTasks)
    .post(tasksController.postTask);

router.route('/task/:id')
	.get(tasksController.getTask)
	.delete(tasksController.deleteTask)
	.put(tasksController.patchTask);

router.route('/task/:id/start')
	.get(tasksController.startTask);

router.route('/task/:id/pause')
	.get(tasksController.pauseTask);

router.route('/task/:id/stop')
	.get(tasksController.stopTask);

module.exports = router;
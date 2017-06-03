const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

router.route('/')
    .get(tasksController.getTasks)
    .post(tasksController.postTask);

router.route('/:id')
	.get(tasksController.getTask)
	.delete(tasksController.deleteTask)
	.put(tasksController.patchTask);

router.route('/:id/start')
	.get(tasksController.startTask);

router.route('/:id/pause')
	.get(tasksController.pauseTask);

router.route('/:id/stop')
	.get(tasksController.stopTask);

module.exports = router;
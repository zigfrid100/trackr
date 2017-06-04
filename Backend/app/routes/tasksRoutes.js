const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

router.route('/')
    .get(tasksController.getTasks)
    .post(tasksController.postTask);

router.route('/:id')
	.get(tasksController.getTask)
	.delete(tasksController.deleteTask)
	.put(tasksController.putTask);

router.route('/start/:id')
	.get(tasksController.startTask);

router.route('/pause/:id')
	.get(tasksController.pauseTask);

router.route('/stop/:id')
	.get(tasksController.stopTask);

module.exports = router;
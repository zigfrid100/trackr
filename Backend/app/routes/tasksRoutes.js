const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

router.route('/')
    .get(tasksController.getTasks)
    .post(tasksController.postTask);

router.route('/start/:id')
	.put(tasksController.startTask);

router.route('/pause/:id')
	.put(tasksController.pauseTask);

router.route('/stop/:id')
	.put(tasksController.stopTask);

router.route('/:id')
    .get(tasksController.getTask)
    .delete(tasksController.deleteTask)
    .put(tasksController.putTask);

module.exports = router;
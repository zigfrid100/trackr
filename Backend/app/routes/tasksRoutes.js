const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

router.route('/')
    .get(tasksController.getTasks)
    .post(tasksController.postTask);

router.route('/:id/start')
	.put(tasksController.startTask);

router.route('/:id/pause')
	.put(tasksController.pauseTask);

router.route('/:id')
    .get(tasksController.getTask)
    .delete(tasksController.deleteTask)
    .put(tasksController.putTask);

router.route('/:id/projects')
    .get(tasksController.getProjects)

module.exports = router;

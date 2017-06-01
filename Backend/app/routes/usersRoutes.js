const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/usersController');

router.route('/task')			
    .get(projectsController.getTasks)
    .post(projectsController.postTask);

router.route('/task/:id')
	.get(projectsController.getTask)
	.delete(projectsController.deleteTask)
	.put(projectsController.patchTask);

router.route('/task/:id/start')
	.get(projectsController.startTask);

router.route('/task/:id/pause')
	.get(projectsController.pauseTask);

router.route('/task/:id/stop')
	.get(projectsController.stopTask);

module.exports = router;
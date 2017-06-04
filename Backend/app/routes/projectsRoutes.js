const express = require('express');
const router = express.Router();

const projectsController = require('./../controllers/projectsController');

router.route('/')
    .get(projectsController.getProjects)
    .post(projectsController.postProject);

router.route('/gettasks/:id')
    .get(projectsController.getTasks);

router.route('/:id')
	.get(projectsController.getProject)
	.delete(projectsController.deleteProject)
	.put(projectsController.putProject);

router.route('/:id/:taskid')
	.get(projectsController.addtask)
	.delete(projectsController.removeTask);

module.exports = router;
const express = require('express');
const router = express.Router();

const projectsController = require('./../controllers/projectsController');

router.route('/')
    .get(projectsController.getProjects)
    .post(projectsController.postProject);

router.route('/:id/tasks')
    .get(projectsController.getTasks);

router.route('/:id')
	.get(projectsController.getProject)
	.delete(projectsController.deleteProject)
	.put(projectsController.putProject);

router.route('/:id/tasks/:taskid')
	.delete(projectsController.removeTask)
    .post(projectsController.addTask);

module.exports = router;

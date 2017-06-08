const express = require('express');
const router = express.Router();

const projectsController = require('./../controllers/projectsController');

router.route('/')
    .get(projectsController.getProjects)
    .post((req, res) => projectsController.postProject(req, res));

router.route('/:id/tasks')
    .get((req, res) => projectsController.getTasks(req, res));

router.route('/:id')
	.get(projectsController.getProject)
	.delete(projectsController.deleteProject)
	.put((req, res) => projectsController.putProject(req, res));

router.route('/:id/tasks/:taskid')
	.delete((req, res) => projectsController.removeTask(req, res))
    .post((req, res) => projectsController.addTask(req, res));

module.exports = router;

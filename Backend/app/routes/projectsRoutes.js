const express = require('express');
const router = express.Router();

const projectsController = require('./../controllers/projectsController');

router.route('/')
    .get(projectsController.getProjects)
    .post(projectsController.postProject);

router.route('/:id')
	.get(projectsController.getProject)
	.delete(projectsController.deleteProject)
	.put(projectsController.putProject);

router.route('/addtask/:id/:taskid')
	.get(projectsController.addtask);

router.route('/gettasks/:id')
    .get(projectsController.gettasks);

module.exports = router;
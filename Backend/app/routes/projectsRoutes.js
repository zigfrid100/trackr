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

router.route('/addtask')
	.get(projectsController.addtask);

router.route('/:id/gettasks')
    .get(projectsController.gettasks);

module.exports = router;
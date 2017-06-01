const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projectsController');

router.route('/project')			
    .get(projectsController.getProjects)
    .post(projectsController.postProject);

router.route('/project/:id')
	.get(projectsController.getProject)
	.delete(projectsController.deleteProject)
	.put(projectsController.patchProject);

module.exports = router;
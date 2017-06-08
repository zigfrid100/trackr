const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.postUser);

router.route('/:id')
    .get(usersController.getUser)
    .delete(usersController.deleteUser)
    .put(usersController.putUser);

module.exports = router;
const express = require('express');
const { getUsers, getUserById } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getUserById);

module.exports = usersRouter;

const express = require('express');
const { getUsers, getUserById, createUser } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getUserById);

usersRouter.post('/users', createUser);

module.exports = usersRouter;

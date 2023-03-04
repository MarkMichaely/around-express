const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'users.json');
const { getDataFromFile } = require('../utils/files');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = 404;
      throw error;
    })
    .then(user =>
      res.send(user)
    )
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user id' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else
        res.status(500).send({ message: 'An error has occured on the server' })
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user =>
      res.send(user)
    )
    .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
};

module.exports = { getUsers, getUserById, createUser };

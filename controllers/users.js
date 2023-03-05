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
    .catch((err) => {
      if (err.name === 'ValidationError')
        res.status(400).send({ message: 'Wrong data for user' })
      res.status(500).send({ message: 'An error has occured on the server' })
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  if (!name || !about) res.status(204).send({ message: 'insuffiecnt data for change' });
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(user =>
      res.send(user)
    )
    .catch((err) => {
      if (err.name === 'ValidationError')
        res.status(400).send({ message: 'Wrong data for user' })
      res.status(500).send({ message: 'An error has occured on the server' })
    });
};

const updateProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) res.status(204).send({ message: 'No link provided' });
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(user =>
      res.send(user)
    )
    .catch((err) => {
      if (err.name === 'ValidationError')
        res.status(400).send({ message: 'Wrong data for user' })
      else
        res.status(500).send({ message: 'An error has occured on the server' })
    });
};
module.exports = { getUsers, getUserById, createUser, updateProfile, updateProfileAvatar };

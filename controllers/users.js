const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');
const { getDataFromFile } = require('../utils/files');

const getUsers = (req, res) => {
  getDataFromFile(dataPath)
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
};

const getUserById = (req, res) => {
  getDataFromFile(dataPath)
    .then((users) => {
      const user = users.find((item) => item._id === req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User ID not found' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
};
module.exports = { getUsers, getUserById };

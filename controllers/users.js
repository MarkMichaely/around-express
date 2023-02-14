const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');
const { getDataFromFile } = require('../utils/files');

const getUsers = (req, res) => {
  getDataFromFile(dataPath)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

const getUserById = (req, res) => {
  getDataFromFile(dataPath)
    .then((users) => {
      const user = users.find((item) => item._id === req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User ID not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err));
};
module.exports = { getUsers, getUserById };

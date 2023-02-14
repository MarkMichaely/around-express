const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');
const { getDataFromFile } = require('../utils/files');

const getCards = (req, res) => {
  getDataFromFile(dataPath)
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
};

module.exports = { getCards };

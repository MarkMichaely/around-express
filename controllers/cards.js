const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');
const { getDataFromFile } = require('../utils/files');

const getCards = (req, res) => {
  getDataFromFile(dataPath)
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err));
};

module.exports = { getCards };
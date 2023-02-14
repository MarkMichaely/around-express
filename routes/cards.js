const express = require('express');
const { getCards } = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/cards', getCards);

module.exports = cardsRouter;

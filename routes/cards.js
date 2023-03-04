const express = require('express');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/cards', getCards);

cardsRouter.delete('/cards/:id', deleteCard);

cardsRouter.post('/cards', createCard);
module.exports = cardsRouter;

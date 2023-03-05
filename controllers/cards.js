const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError')
        res.status(400).send({ message: 'Wrong data for card' })
      else
        res.status(500).send({ message: 'An error has occured on the server' })
    });
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((doc) => {
      if (doc) {
        res.status(204).send({ message: 'Card succesfully removed' })
      }
      else
        res.status(404).send({ message: 'No card found' });
    }).catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError')
        res.status(400).send({ message: "unsupported cardId" });
      else
        res.status(500).send({ message: 'An error has occured on the server' })
    });
}

const unLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError')
        res.status(400).send({ message: "unsupported cardId" });
      else
        res.status(500).send({ message: 'An error has occured on the server' })
    });
}
module.exports = { getCards, deleteCard, createCard, likeCard, unLikeCard };

const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
const app = express();

const { PORT = 3000 } = process.env;

// create application/json parser
const jsonParser = bodyParser.json()

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use('/', jsonParser, usersRouter);

app.use('/', jsonParser, cardsRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

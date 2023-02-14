const express = require('express');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

app.use('/', usersRouter);

app.use('/', cardsRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const { globalHandleError } = require('./middlewares');

// const {
//   usersRouter,
//   petsRouter,
//   noticesRouter,
//   partnersRouter,
//   newsRouter,
// } = require('./routes/api');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use('/api/users', usersRouter);
// app.use('/api/pets', petsRouter);
// app.use('/api/notices', noticesRouter);
// app.use('/api/partners', partnersRouter);
// app.use('/api/news', newsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(globalHandleError);

module.exports = app;

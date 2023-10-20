/* eslint-disable no-console */

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

const routes = require('./src/routes/routes');

app.use('/', routes);

app.listen(3001, () => {
  console.log('Server is running.');
});

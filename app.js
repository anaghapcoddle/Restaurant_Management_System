/* eslint-disable no-console */

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

const authRoutes = require('./src/routes/auth');
const menuRoutes = require('./src/routes/menu');
const ordersRoutes = require('./src/routes/orders');
const tableRoutes = require('./src/routes/table');

app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/orders', ordersRoutes);
app.use('/table', tableRoutes);

app.listen(3000, () => {
  console.log('Server is running.');
});

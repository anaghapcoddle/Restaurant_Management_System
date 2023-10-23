/* eslint-disable no-console */

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

const authRoutes = require('./src/routes/auth');
const menuRoutes = require('./src/routes/menu');
const ordersRoutes = require('./src/routes/orders');

app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/orders', ordersRoutes);

app.listen(3000, () => {
  console.log('Server is running.');
});

/* eslint-disable no-console */

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

const authRoutes = require('./src/routes/auth');
const menuRoutes = require('./src/routes/menu');
const ordersRoutes = require('./src/routes/orders');
const tableRoutes = require('./src/routes/table');
const billRoutes = require('./src/routes/bill');
const adminEmployeeRoutes = require('./src/admin/routes/employee');
const adminMenuRoutes = require('./src/admin/routes/menu');

app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/orders', ordersRoutes);
app.use('/table', tableRoutes);
app.use('/bill', billRoutes);
app.use('/admin', adminEmployeeRoutes);
app.use('/admin', adminMenuRoutes);

app.listen(3000, () => {
  console.log('Server is running.');
});

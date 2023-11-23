const express = require('express');
const helmet = require('helmet');

const port = 3000;
const cors = require('cors');

const corsOpts = {
  origin: 'http://localhost:3000',

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

const app = express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require('./src/routes/auth');
const menuRoutes = require('./src/routes/menu');
const ordersRoutes = require('./src/routes/orders');
const tableRoutes = require('./src/routes/table');
const billRoutes = require('./src/routes/bill');
const adminEmployeeRoutes = require('./src/admin/routes/employee');
const adminMenuRoutes = require('./src/admin/routes/menu');
const adminTableRoutes = require('./src/admin/routes/table');
const adminOrdersRoutes = require('./src/admin/routes/orders');

app.use('/auth', cors(corsOpts), authRoutes);
app.use('/menu', cors(corsOpts), menuRoutes);
app.use('/orders', cors(corsOpts), ordersRoutes);
app.use('/table', cors(corsOpts), tableRoutes);
app.use('/bill', cors(corsOpts), billRoutes);
app.use('/admin/employee', cors(corsOpts), adminEmployeeRoutes);
app.use('/admin/menu', cors(corsOpts), adminMenuRoutes);
app.use('/admin/table', cors(corsOpts), adminTableRoutes);
app.use('/admin/orders', cors(corsOpts), adminOrdersRoutes);

app.listen(port, () => {
  console.log('Server is running.');
});

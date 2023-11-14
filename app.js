const express = require('express');

const port = 3000;
const cors = require('cors');

const app = express();

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

app.use('/auth', cors(), authRoutes);
app.use('/menu', cors(), menuRoutes);
app.use('/orders', cors(), ordersRoutes);
app.use('/table', cors(), tableRoutes);
app.use('/bill', cors(), billRoutes);
app.use('/admin/employee', cors(), adminEmployeeRoutes);
app.use('/admin/menu', cors(), adminMenuRoutes);
app.use('/admin/table', cors(), adminTableRoutes);
app.use('/admin/orders', cors(), adminOrdersRoutes);

app.listen(port, () => {
  console.log('Server is running.');
});

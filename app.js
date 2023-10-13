

const express = require('express');

const app = express();
app.use(express.json());

const users = [];

app.post('/signup', (req, res) => {
  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  };

  users.push(data);

  res.status(201).json({ message: 'User account created.' });
});

app.listen(3000, () => {
  console.log(`Server is running`);
});

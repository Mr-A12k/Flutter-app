const express = require('express');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const workRoutes = require('./routes/workRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/departments', departmentRoutes);
app.use('/works', workRoutes);
app.use('/users', userRoutes);

module.exports = app;
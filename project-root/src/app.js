const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/v1/user', userRoutes);
app.use('/v1/category', categoryRoutes);

module.exports = app;

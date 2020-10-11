const express = require('express');
const cors = require('cors');
const requireDir = require('require-dir');
require('dotenv').config();
require('./config/database')(process.env.DB_HOST);

const app = express();

app.use(express.json());
app.use(cors());

requireDir('./models');

app.use('/api', require('./routes'));

module.exports = app;
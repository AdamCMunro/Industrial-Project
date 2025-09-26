const express = require('express');
const dotenv = require('dotenv');
const accountRoutes = require('./routes/accountRoutes');

dotenv.config();

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use('/api/accounts', accountRoutes); // Mount account routes

module.exports = app;
const express = require('express');
const middleware = require('./middlewares');
const routes = require('./routes');

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const app = express();

app.use(express.json());

// Desativa o X-Powered-By: Express
app.disable('x-powered-by');

// routes
app.use('/user', routes.user);
app.use('/login', routes.login);

// middlewares
app.use(middleware.error);

module.exports = app;

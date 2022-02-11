const cors = require('cors');
const express = require('express');
const routes = require('./src/routes');

require('dotenv').config();

const app = express();

app.use(express.json());

// Permite acesso externo
app.use(cors());

// Desativa o X-Powered-By: Express
app.disable('x-powered-by');

// routes
app.use('/user', routes.user);

// Passamos a porta onde o servidor ficará ouvindo
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate')
const routes = require('./routes');

const app = express();

//Dizer à aplicação que vamos receber JSON nos request bodies
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

module.exports = app;
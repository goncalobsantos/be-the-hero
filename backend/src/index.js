const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

//Dizer à aplicação que vamos receber JSON nos request bodies
app.use(express.json());
app.use(cors());
app.use(routes);

const port = 3333;
app.listen(port, () => {
    console.log('> Server listening on port ', port)
})
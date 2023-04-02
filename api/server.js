const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//IMPORTED ROUTES HERE
const mealsRouter = require('../routers/meals.js');
const mealOptionsRouter = require('../routers/meal_options.js');
const ordersRouter = require('../routers/orders.js');


const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

//USE ROUTES HERE
server.use('/api/meals', mealsRouter)
server.use('/api/meal_options', mealOptionsRouter)
server.use('/api/orders', ordersRouter)


module.exports = server;

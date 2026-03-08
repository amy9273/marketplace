// app.js
const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');

const app = express();

//public
app.use(express.static(`${__dirname}/public`));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use('/api/v1/products', productRouter); // Changed from '/' to '/api/v1/products'
app.use('/api/v1/categories', categoryRouter); // Changed from '/' to '/api/v1/categories'

module.exports = app; // export the Express app
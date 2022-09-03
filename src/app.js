const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const router = require('./routes');

const app = express();
app.set('port', 8080);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// compression
app.use(compression());

// cookie parser
app.use(cookieParser());

// app.use('api/v1', router);
app.use('/api/v1', router);

module.exports = app;

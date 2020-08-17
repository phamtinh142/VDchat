const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const router = require('../routes');
const { logs } = require('./vars');

const app = express();

app.use('public', express.static(path.join(__dirname, '../../public')));

app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

module.exports = app;
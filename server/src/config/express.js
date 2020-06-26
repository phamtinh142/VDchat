const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

const router = require('../routes');

const app = express();

app.use('public', express.static(path.join(__dirname, '../../public')));

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

module.exports = app;
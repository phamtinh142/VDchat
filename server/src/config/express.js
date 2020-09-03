const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const session = require('express-session');
const passport = require('passport');

const router = require('../routes');
const { logs, sessionSecret } = require('./vars');
const errors = require('./errors');
require('./passport');

const app = express();

app.use('public', express.static(path.join(__dirname, '../../public')));

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan(logs));

app.use('/api', router);

app.use(errors.converter);

app.use(errors.notFound);

app.use(errors.handler);

module.exports = server;

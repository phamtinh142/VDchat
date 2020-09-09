const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const router = require('../routes');
const { logs, sessionSecret } = require('./vars');
const errors = require('./errors');

const app = express();

app.use('public', express.static(path.join(__dirname, '../../public')));

const server = http.createServer(app);

// config CORS
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config session
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

// config passport
app.use(passport.initialize());
app.use(passport.session());

// config log
app.use(morgan(logs));

// router
app.use('/api', router);

// handle error
app.use(errors.converter);
app.use(errors.notFound);
app.use(errors.handler);

module.exports = server;

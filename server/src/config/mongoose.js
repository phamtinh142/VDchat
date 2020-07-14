const mongoose = require('mongoose');

const { mongoUri } = require('../config/vars');

exports.connect = () => {
  mongoose.connect(mongoUri, {
    useCreateIndex: true,
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => console.log('mongoDB connected...'))
    .catch((error) => console.log('Error: ', error));
  return mongoose.connection;
}
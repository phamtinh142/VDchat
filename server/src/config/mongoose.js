const mongoose = reqire('mongoose');

const { mongoUri } = require('../config/vars');

exports.connect = () => {
  mongoose.connect(mongoUri, {
    
  }).then(() => console.log('Connected mongodb successfully!'))
    .catch((error) => console.log('Error: ', error));
  return mongoose.connect;
}
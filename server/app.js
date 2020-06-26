const server = require('./src/config/express');
const mongoose = require('mongoose');
const { port, mongoUri } = require('./src/config/vars');
const logger = require('./src/config/winston');

// Kết nối tới mongodb
mongoose.connect(mongoUri, {
  useCreateIndex: true,
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => logger.info('Mongodb connected...'))
  .catch((error) => logger.error(error));

server.listen(port, () => console.log(`server running on port ${port}`));
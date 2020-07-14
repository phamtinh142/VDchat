const server = require('./src/config/express');
const { port, env } = require('./src/config/vars');

const mongoDB = require('./src/config/mongoose');

// Kết nối tới mongodb
mongoDB.connect();

server.listen(port, () => console.log(`server running on port ${port} (${env})`));
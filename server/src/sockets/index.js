const socketioJwt = require('socketio-jwt');

const { jwtSecret } = require('../config/vars');
const User = require('../models/user.model');

const userSocket = require('./frontend/user.socket');
const messageSocket = require('./frontend/message.socket');
const contactSocket = require('./frontend/contact.socket');

module.exports = (io) => {
  io.use(socketioJwt.authorize({
    secret: jwtSecret,
    handshake: true,
  }));

  const clients = {};

  io.on('connection', async (socket) => {
    try {
      const user = await User.findOne({ _id: socket.decoded_token.user._id });

      if (user) {
        if (clients[user._id]) {
          clients[user._id].push(socket.id);
        } else {
          clients[user._id] = [socket.id];
        }
      }

      socket.on('disconnect', () => {
        if (clients[user._id]) {
          clients[user._id] = clients[user._id].filter((socketID) => socketID !== socket.id);
          if (!clients[user._id].length) {
            delete clients[user._id];
          }
        }
      });

      userSocket(io, socket, clients, user);

      contactSocket(io, socket, clients, user);

      messageSocket(io, socket, clients, user);
    } catch (error) {
      console.log('------- error ------- eventConnectionSocket');
      console.log(error);
      console.log('------- error ------- eventConnectionSocket');
    }
  });
};
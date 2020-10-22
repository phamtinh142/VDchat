const User = require('../../models/user.model');
const Friends = require('../../models/pendingFriends.model');
const { emitEventToArray } = require('../helper');

module.exports = (io, socket, clients, user) => {
  socket.on('add_new_contact', async (data) => {
    try {
      const notifycation = {
        avatar: user.avatar,
        userName: user.userName,
        _id: user._id,
        status: 0,
      };

      if (clients[data.recipientID]) {
        emitEventToArray(
          io, 
          clients, 
          data.recipientID, 
          'ADD_NEW_CONTACT', 
          notifycation,
        );
      }
    } catch (error) {
      console.log('------- error ------- add_new_contact');
      console.log(error);
      console.log('------- error ------- add_new_contact');
    }
  });

  socket.on('cancel_request_contact', (data) => {
    try {
      const notifycation = {
        _id: user._id,
      };

      if (clients[data.recipientID]) {
        emitEventToArray(
          io, 
          clients, 
          data.recipientID, 
          'CANCEL_REQUEST_CONTACT', 
          notifycation,
        );
      }
    } catch (error) {
      console.log('------- error ------- cancel_request_contact');
      console.log(error);
      console.log('------- error ------- cancel_request_contact');
    }
    console.log('------- data ------- ');
    console.log(data);
    console.log('------- data ------- ');
  });

  socket.on('accept_request_contact', (data) => {
    console.log('------- data ------- accept_request_contact');
    console.log(data);
    console.log('------- data ------- accept_request_contact');
  });

  socket.on('remove_request_contact', (data) => {
    console.log('------- data ------- remove_request_contact');
    console.log(data);
    console.log('------- data ------- remove_request_contact');
  });
};
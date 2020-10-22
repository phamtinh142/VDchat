const emitEventToArray = (io, clients, userID, eventName, data) => {
  return clients[userID].forEach((socketID) => {
    io.sockets.connected[socketID].emit(eventName, data);
  });
};

module.exports = {
  emitEventToArray,
};
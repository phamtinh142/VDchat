module.exports = (io, socket, clients, user) => {
  socket.on('check_listener_status', (data) => {
    console.log(`------- data ------- check_listener_status`);
    console.log(data);
    console.log(`------- data ------- check_listener_status`);
  });
}
module.exports = (io, socket, clients, user) => {
  socket.on('typing_on', (data) => {
    console.log(`------- data ------- typing_on`);
    console.log(data);
    console.log(`------- data ------- typing_on`);
  });

  socket.on('typing_off', (data) => {
    console.log(`------- data ------- typing_off`);
    console.log(data);
    console.log(`------- data ------- typing_off`);
  });

  socket.on('sent_message', (data) => {
    console.log(`------- data ------- sent_message`);
    console.log(data);
    console.log(`------- data ------- sent_message`);
  });
}
require('dotenv').config();

// old sockets
// io.on('connection', (socket) => {
//   // If someone goes to the bathroom send him the current status of rooms
//   // socket.on('bathroom-connect', function () {
//   //   io.emit('bathrooms', roomsArr);
//   // });
//   // // If a new user connects to a chatroom
//   // socket.on('room-connect', function (room) {
//   //   roomsArr[room] = true;
//   //   io.emit('bathrooms', roomsArr);
//   // });
//   // // If a user connects to a chatroom
//   // socket.on('room-disconnect', function (room) {
//   //   roomsArr[room] = false;
//   //   io.emit('bathrooms', roomsArr);
//   // });
//   // // If someone sends a message
//   // socket.on('sendMessage', (msg) => {
//   //   socket.broadcast.emit('newMessage', msg);
//   // });
// });

module.exports = (server) => {
  const io = require('socket.io')(server);

  // If a new user connects
  io.on('connection', (client) => {
    client.on('join', (data) => {
      console.log(data);
      client.emit('messages', 'Socket Connected to Server');
    });

    client.on('messages', (data) => {
      client.emit('broad', data);
    });
  });

  return io;
};

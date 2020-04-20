require('dotenv').config();
const socketPort = process.env.SOCKETPORT || 1338;
const io = require('socket.io')(socketPort);

module.exports = () => {
  // If a new user connects
  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      console.log(data);
      socket.emit('messages', 'Socket Connected to Server');
    });

    socket.on('client-global-message', (data) => {
      socket.broadcast.emit('server-global-message', data);
    });

    socket.on('messages', (data) => {
      socket.emit('broad', data);
    });
  });

  return io;
};

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

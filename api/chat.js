require('dotenv').config();
const rooms = require('./rooms.js');
// const socketPort = process.env.SOCKETPORT || 1338;
// const io = require('socket.io')(socketPort);

module.exports = (io) => {
  // If a new user connects
  const users = {};

  console.log(rooms);

  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      console.log(data);
      socket.emit('messages', 'Socket Connected to Server');
    });

    // ============ Main Floor ============ //
    socket.on('new-user', (name) => {
      users[socket.id] = name;
      socket.broadcast.emit('user-connected', name);
    });

    socket.on('send-chat-message', (message) => {
      console.log('recieving chat message');
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id]);
      delete users[socket.id];
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

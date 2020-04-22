require('dotenv').config();
const params = require('./params.js');
const rooms = require('./rooms.js');
// const socketPort = process.env.SOCKETPORT || 1338;
// const io = require('socket.io')(socketPort);

const cubicleNamesOrdered = [];
for (let index = 1; index < params.cubiclesAmount; index++) {
  let roomName = `room${index}`;
  cubicleNamesOrdered.push(roomName);
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      console.log(data);
      socket.emit('messages', 'Socket Connected to Server');
    });

    // ============ General Chat ============ //
    // new user enters
    socket.on('new-user', (room, name) => {
      socket.join(room);
      rooms[room].users[socket.id] = name;
      socket.to(room).broadcast.emit('user-connected', name);

      // update room specs on users joining
      if (cubicleNamesOrdered.includes(room)) sendCubicleStatusToEveryoneInToilets();
      console.log(cubicleNamesOrdered.includes(room));

      // print room stats
      if (params.logRoomsOnConnect) {
        console.log(rooms);
      }
    });

    // all chat messages
    socket.on('send-chat-message', (room, message) => {
      console.log('recieving chat message');
      socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
    });

    // removes user from all rooms, if disconnected
    socket.on('disconnect', () => {
      getUserRooms(socket).forEach((room) => {
        socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
        delete rooms[room].users[socket.id];

        // update room specs on users joining
        if (cubicleNamesOrdered.includes(room)) sendCubicleStatusToEveryoneInToilets();
      });
    });

    function getUserRooms(socket) {
      return Object.entries(rooms).reduce((names, [name, room]) => {
        if (room.users[socket.id] != null) names.push(name);
        return names;
      }, []);
    }

    // ============ TOILETS ROOM ============ //
    socket.on('getCubiclesStatus', () => {
      sendCubicleStatus(socket);
    });

    const sendCubicleStatus = (socket) => {
      socket.emit('cubicleStatus', returnCubicleOccupation());
    };

    const sendCubicleStatusToEveryoneInToilets = () => {
      socket.to('toilets').broadcast.emit('cubicleStatus', returnCubicleOccupation());
    };

    /** Returns an array with occupation numbers for all cubicles*/
    const returnCubicleOccupation = () => {
      let cubicleUsers = [];
      cubicleNamesOrdered.forEach((roomName) => {
        let userNumber = Object.keys(rooms[roomName].users).length;
        let string = userNumber >= params.maxUsersPerCubicle ? 'full' : `${userNumber}/${params.maxUsersPerCubicle}`;
        cubicleUsers.push(string);
      });
      return cubicleUsers;
    };

    // general messaging
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

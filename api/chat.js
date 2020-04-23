require('dotenv').config();
const params = require('./params.js');
const rooms = require('./rooms.js');
// const socketPort = process.env.SOCKETPORT || 1338;
// const io = require('socket.io')(socketPort);

const cubicleNamesOrdered = [];
for (let index = 1; index < params.cubiclesAmount + 1; index++) {
  let roomName = `room${index}`;
  cubicleNamesOrdered.push(roomName);
}

const allChatroomNamesOrdered = Object.keys(rooms);

module.exports = (io) => {
  if (params.updateUserCount) {
    setInterval(() => {
      io.emit('total-users', returnTotalUserCount());
    }, params.updateUserCountFrequency);
  }

  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      if (params.logUserSocketConnected) {
        socket.emit('messages', 'Socket Connected to Server');
      }
    });

    // ============ General Chat ============ //
    // new user enters
    socket.on('new-user', (room, name) => {
      // check if cubicly isn't full, otherwise kick the user and prevent from joining
      if (room != 'mainfloor' && room != 'toilets' && room != 'lostandfound') {
        let amountOfUsers = Object.keys(rooms[room].users).length;
        if (amountOfUsers >= params.maxUsersPerCubicle) {
          socket.emit('error-message', { type: 'cubicle-full' });
          return;
        }
      }

      socket.join(room);
      rooms[room].users[socket.id] = name;

      // broadcast if people entered the room
      if (params.messageOnPeopleEnteringRoom) {
        socket.to(room).broadcast.emit('user-connected', name);
      }

      // update cubicles numbers
      if (cubicleNamesOrdered.includes(room)) sendCubicleStatusToEveryoneInToilets();

      // print room stats
      if (params.logRoomsDataOnConnect) {
        console.log(rooms);
      }
    });

    /* Custom leave socket for vue, as a route doesn't trigger disconnect */
    /* If user closes window, this still does trigger*/
    socket.on('user-leave', (room) => {
      // check if room exists
      if (allChatroomNamesOrdered.includes(room)) {
        // delete user
        delete rooms[room].users[socket.id];
        socket.leave(room);
      }
    });

    // all chat messages
    socket.on('send-chat-message', (room, message) => {
      // check if user in correct room, either all rooms or cubicle
      if (params.checkOnlyIfUserInCubicle) {
        if (room != 'mainfloor' && room != 'toilets' && !rooms[room].users[socket.id]) {
          socket.emit('error-message', { type: 'sending-to-wrong-room' });
          return;
        }
      } else {
        if (!rooms[room].users[socket.id]) {
          socket.emit('error-message', { type: 'sending-to-wrong-room' });
          return;
        }
      }

      if (room === 'mainfloor') {
        socket.to(room).volatile.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
      } else {
        socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
      }
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

    // general messaging
    socket.on('messages', (data) => {
      socket.emit('broad', data);
    });
  });

  return io;
};

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

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

const returnTotalUserCount = () => {
  let users = 0;
  allChatroomNamesOrdered.forEach((roomName) => {
    users = users + Object.keys(rooms[roomName].users).length;
  });

  return users;
};

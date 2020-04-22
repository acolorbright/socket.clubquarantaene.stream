require('dotenv').config();
const params = require('./params.js');

const rooms = {};
for (let index = 0; index < params.cubiclesAmount; index++) {
  let obj = { users: {} }; // no users in the beginning
  let roomName = `room${index}`;
  rooms[roomName] = obj;
}

// add toilet room
rooms.mainfloor = { users: {} };

// add main room
rooms.toilets = { users: {} };

module.exports = rooms;

require('dotenv').config();
const express = require('express');
const http = require('http');
const router = express.Router();
const io = require('socket.io')(http, {
  origins: '*:*',
  pingInterval: 10000,
  pingTimeout: 5000,
});

const path = require('path');
const roomsAmount = 22;

let roomsArr = [];

function createEmptyRooms(arr, amount) {
  roomsArr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(true);
  }
}

createEmptyRooms(roomsArr, roomsAmount);

setInterval(function () {
  createEmptyRooms(roomsArr, roomsAmount);
  io.emit('bathrooms', roomsArr);
}, 1 * 60 * 60 * 1000);

// Serve the index.html
router.get('*', function (req, res) {
  // res.sendFile(path.join(__dirname + '/index.html'));
  // res.sendFile(path.join(__dirname + '/../html/index.html'));
  res.send('chat is running');
});

// setInterval(() => {
//   io.emit('userCount', io.engine.clientsCount);
// }, 5000);

// If a new user connects
io.on('connection', (socket) => {
  // If someone goes to the bathroom send him the current status of rooms
  // socket.on('bathroom-connect', function () {
  //   io.emit('bathrooms', roomsArr);
  // });
  // // If a new user connects to a chatroom
  // socket.on('room-connect', function (room) {
  //   roomsArr[room] = true;
  //   io.emit('bathrooms', roomsArr);
  // });
  // // If a user connects to a chatroom
  // socket.on('room-disconnect', function (room) {
  //   roomsArr[room] = false;
  //   io.emit('bathrooms', roomsArr);
  // });
  // // If someone sends a message
  // socket.on('sendMessage', (msg) => {
  //   socket.broadcast.emit('newMessage', msg);
  // });
});

module.exports = router;

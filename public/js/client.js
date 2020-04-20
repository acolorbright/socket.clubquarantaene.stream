'use strict';

//connection to socket
const socket = io('http://localhost:1338');

//================= SOCKET IO =================
socket.on('connect', function (data) {
  socket.emit('join', 'Server Connected to Client');
});

socket.on('messages', function (data) {
  console.log(data);
});

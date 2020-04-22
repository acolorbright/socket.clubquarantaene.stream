'use strict';

//connection to socket
// eslint-disable-next-line no-undef
const socket = io('http://localhost:1338');

let uData = {
  name: null,
};

// username
if (sessionStorage.getItem('clubQName') == null) {
  const name = prompt('what is your name?');
  sessionStorage.setItem('clubQName', name);
  uData.name = name;
} else {
  uData.name = sessionStorage.getItem('clubQName');
}

//================= SOCKET IO =================
socket.on('connect', function () {
  socket.emit('join', 'Server Connected to Client');
});

socket.emit('new-user', roomName, uData.name);
socket.emit('getToiletStatus');
console.log(`emited new user ${uData.name}`);

socket.on('toiletStatus', function (data) {
  console.log(data);
});

socket.on('messages', function (data) {
  console.log(data);
});

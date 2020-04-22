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
  socket.emit('new-user', roomName, uData.name);
});

// socket.emit('new-user', roomName, uData.name);

socket.emit('getCubiclesStatus');

socket.on('cubicleStatus', function (cubicleDataArray) {
  document.querySelectorAll('.cubicle').forEach(function (cubicle, i) {
    // update string
    cubicle.querySelector('.occupied').innerHTML = cubicleDataArray[i];

    // hide link if full
    if (cubicleDataArray[i] === 'full') {
      cubicle.querySelector('.enter-cubicle-link').style.visibility = 'hidden';
    } else {
      cubicle.querySelector('.enter-cubicle-link').style.visibility = 'visible';
    }
  });
});

socket.on('messages', function (data) {
  console.log(data);
});

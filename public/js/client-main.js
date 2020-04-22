'use strict';

console.log('using main js');

// eslint-disable-next-line no-undef
const socket = io('http://localhost:1338');

// ============ Username Handling ============ //

let uData = {
  name: null,
};

if (sessionStorage.getItem('clubQName') == null) {
  const name = prompt('what is your name?');
  sessionStorage.setItem('clubQName', name);
  uData.name = name;
} else {
  uData.name = sessionStorage.getItem('clubQName');
}

// ============ Chat Interface Functions  ============ //
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

// append message to chat
const appendMessage = (data) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = data;
  messageContainer.append(messageElement);
};

if (messageForm != null) {
  // send  message
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', roomName, message);
    messageInput.value = '';
  });

  // append the user joined the chat
  appendMessage('You joined');
}

//================= SOCKET IO =================
socket.on('connect', function () {
  socket.emit('join', 'Server Connected to Client');

  // also put the user in the right room on connection (the room he currentliy is in on the website)
  socket.emit('new-user', roomName, uData.name);
  console.log(`emited new user ${uData.name}`);
});

socket.on('messages', function (data) {
  console.log(data);
});

socket.on('chat-message', function (data) {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', function (name) {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', function (name) {
  appendMessage(`${name} disconnected`);
});

socket.on('total-users', function (amount) {
  document.getElementById('totalUsers').innerHTML = amount;
});

socket.on('error-message', function (error) {
  switch (error.type) {
    case 'sending-to-wrong-room':
      alert('you‘re not allowed to send to a room you‘re not logged in to');
      break;

    default:
      alert(`Recieved error with unknown type: ${error.type}`);
      break;
  }
});

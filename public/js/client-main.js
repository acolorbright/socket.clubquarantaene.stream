'use strict';
// ============ Username Handling ============ //
let userAllowedIn = false;

let uData = {
  name: null,
  uuid: null,
};

if (sessionStorage.getItem('clubQName') == null || sessionStorage.getItem('clubQUuid') == null) {
  alert('please auth yourself on the hidden login before entering the chat');
  // window.location.href = './mainfloor';
  // const name = prompt('what is your name?');
  // sessionStorage.setItem('clubQName', name);
  // uData.name = name;
  // uData.uuid = 'noUuid-' + name;
} else {
  uData.name = sessionStorage.getItem('clubQName');
  uData.uuid = sessionStorage.getItem('clubQUuid');
  userAllowedIn = true;
}

if (userAllowedIn) {
  let urlName = 'https://socket.clubquarantaene.stream/';
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    urlName = 'http://localhost:1337';
  }

  // eslint-disable-next-line no-undef
  const socket = io(urlName);

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
      socket.emit('send-chat-message', { room: roomName, message: message, uuid: uData.uuid });
      messageInput.value = '';
    });

    // append the user joined the chat
    appendMessage('You joined');
  }

  //================= SOCKET IO =================
  socket.on('connect', function () {
    socket.emit('join', 'Server Connected to Client');
    // also put the user in the right room on connection (the room he currentliy is in on the website)
    socket.emit('new-user', { room: roomName, uuid: uData.uuid, name: uData.name });
    console.log(`emited new user ${uData.name}`);
  });

  socket.on('messages', function (data) {
    console.log(data);
  });

  if (messageContainer != null) {
    // append only if messages element
    socket.on('chat-message', function (data) {
      appendMessage(`${data.name}: ${data.message}`);
    });

    socket.on('user-connected', function (name) {
      appendMessage(`${name} connected`);
    });

    socket.on('user-disconnected', function (name) {
      appendMessage(`${name} disconnected`);
    });
  }

  socket.on('total-users', function (amount) {
    document.getElementById('totalUsers').innerHTML = amount;
  });

  socket.on('cubicleColors', function (colorArray) {
    console.log('cubicle user colors', colorArray);
  });

  //================= ERRORS =================

  socket.on('error-message', function (error) {
    switch (error.type) {
      case 'sending-to-wrong-room':
        alert('you‘re not allowed to send to a room you‘re not logged in to');
        break;
      case 'no-uuid-sent':
        alert('you need to send a uuid with your messages');
        break;

      default:
        alert(`Recieved error with unknown type: ${error.type}`);
        break;
    }
  });

  //================= TOILETS =================
  // eslint-disable-next-line no-undef
  if (roomName == 'toilets') {
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
  }
}

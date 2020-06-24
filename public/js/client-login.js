'use strict';
let params = {
  url: 'https://socket.clubquarantaene.stream/v1/registerUser',
  checkUrl: 'https://socket.clubquarantaene.stream/v1/colorAvailable',
};

// change the urls online
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  params.url = 'http://localhost:1337/v1/registerUser';
  params.checkUrl = 'http://localhost:1337/v1/colorAvailable';
}

const requestColor = () => {
  let r = returnNumberString(document.getElementById('r').value);
  let g = returnNumberString(document.getElementById('g').value);
  let b = returnNumberString(document.getElementById('b').value);
  let timestamp = Date.now();
  let forceLogin = document.getElementById('forceLogin').checked;

  let rgbString = `${r},${g},${b}`;
  postData(params.url, { rgbString: rgbString, timestamp: timestamp, force: forceLogin }).then((data) => {
    if (data.userName) {
      sessionStorage.setItem('clubQName', data.userName);
      sessionStorage.setItem('clubQUuid', data.uuid);
      window.location.href = './mainfloor';
    } else {
      document.getElementById('error').innerHTML = data.message;
    }

    console.log(data); // JSON data parsed by `response.json()` call
  });
};

const checkColor = () => {
  let r = returnNumberString(document.getElementById('r').value);
  let g = returnNumberString(document.getElementById('g').value);
  let b = returnNumberString(document.getElementById('b').value);

  let forceLogin = document.getElementById('forceLogin').checked;

  let rgbString = `${r},${g},${b}`;
  postData(params.checkUrl, { rgbString: rgbString, force: forceLogin }).then((data) => {
    document.getElementById('error').innerHTML = `color available: ${data.available}`;
    console.log(data); // JSON data parsed by `response.json()` call
  });
};

function returnNumberString(number) {
  let string = number;
  if (string.length < 2) {
    string = '00' + string;
  } else if (string.length < 3) {
    string = '0' + string;
  }
  return string;
}

function imposeMinMax(el) {
  console.log('impose');
  if (el.value != '') {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  } else {
    el.value = '000';
  }
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

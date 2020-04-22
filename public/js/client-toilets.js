'use strict';

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

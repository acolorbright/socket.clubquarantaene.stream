const express = require('express');
const router = express.Router();
require('dotenv').config();

// example route
router.post('/registerUser', async function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // []  check if valid color
  // [] do the check if the number is free

  let rgbString = req.body.rgbString;
  let isFree = true;

  if (isFree) {
    res.status(200).json({ message: 'color registered', userName: rgbString });
  } else {
    res.status(400).json({ message: 'color already taken' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { uuid } = require('uuidv4');

require('dotenv').config();

// example route
router.post('/registerUser', async function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // [] check if valid color
  // [] do the check if the number is free
  // [] save the new values to the db

  let userID = uuid();
  let rgbString = req.body.rgbString;
  let isFree = true;

  if (isFree) {
    res.status(200).json({ message: 'color registered', userName: rgbString, uuid: userID });
  } else {
    res.status(400).json({ message: 'color already taken' });
  }
});

module.exports = router;

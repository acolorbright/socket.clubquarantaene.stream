const express = require('express');
const router = express.Router();
const { uuid } = require('uuidv4');
const database = require('../database');

require('dotenv').config();

router.post('/registerUser', async function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // [] check if valid color
  // [] do the check if the number is free
  // [] save the new values to the db

  let userID = uuid();
  let rgbString = req.body.rgbString;
  let isFree = true;

  if (isFree) {
    res.status(200).json({ available: true, message: 'color registered', userName: rgbString, uuid: userID });
  } else {
    res.status(200).json({ available: false, message: 'color already taken' });
  }
});

router.get('/registerUser', async function (req, res) {
  res.status(200).send('api v1 running ;)');
});

router.get('/colorAvailable', async function (req, res) {
  res.status(200).send('api v1 running ;)');
});

router.post('/colorAvailable', async function (req, res) {
  let rgbString = req.body.rgbString;
  // [] check if valid color
  // [] do the check if the number is free

  let isFree = true;

  if (isFree) {
    res.status(200).json({ available: true });
  } else {
    res.status(200).json({ available: false });
  }
});

router.get('/test', async function (req, res) {
  res.status(200).send('api v1 running ;)');
});

module.exports = router;

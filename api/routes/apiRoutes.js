require('dotenv').config();
const express = require('express');
const router = express.Router();
const { uuid } = require('uuidv4');
const params = require('../params.js');

// database
const MongoClient = require('mongodb').MongoClient;
const dbBase = process.env.MONGODBIP;
const dbName = process.env.DBNAME;
const dbUsr = process.env.MDBNAME;
const dbPw = process.env.MDBPW;
const mongoUrl = `mongodb://${dbUsr}:${dbPw}@${dbBase}/${dbName}/mydb?authSource=admin`;

let db;
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db(dbName);

  console.log(`Connected MongoDB: ${mongoUrl}`);
  console.log(`Database: ${dbName}`);
});

router.post('/registerUser', async function (req, res) {
  const rgbString = req.body.rgbString;
  // [] check if valid color
  //let allColors = await db.collection(params.usersCollectionName).find().toArray();

  let query = { name: rgbString };
  let user = await db.collection(params.usersCollectionName).find(query).toArray();

  if (user.length > 0) {
    res.status(200).json({ available: false, message: 'color already taken' });
  } else {
    const userID = uuid();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var newUSer = { name: rgbString, timestamp: new Date(), userID: userID, ip: ip };
    await db.collection(params.usersCollectionName).insertOne(newUSer, function (err, res) {
      if (err) throw err;
    });
    res.status(200).json({ available: true, message: 'color registered', userName: rgbString, uuid: userID });
  }

  // insertSampleUserToUsers(rgbString, ip);
  // old repnse
  // let isFree = true;
  // if (isFree) {
  //   res.status(200).json({ available: true, message: 'color registered', userName: rgbString, uuid: userID });
  // } else {
  //   res.status(200).json({ available: false, message: 'color already taken' });
  // }
});

router.get('/registerUser', async function (req, res) {
  res.status(200).send('api v1 running ;)');
});

router.get('/colorAvailable', async function (req, res) {
  res.status(200).send('api v1 running ;)');
});

router.post('/colorAvailable', async function (req, res) {
  let rgbString = req.body.rgbString;
  let query = { name: rgbString };

  let user = await db.collection(params.usersCollectionName).find(query).toArray();

  if (user.length > 0) {
    res.status(200).json({ available: false });
  } else {
    res.status(200).json({ available: true });
  }

  // original testing
  // let isFree = true;
  // if (isFree) {
  //   res.status(200).json({ available: true });
  // } else {
  //   res.status(200).json({ available: false });
  // }
});

router.get('/test', async function (req, res) {
  res.status(200).send('api v1 running ;)');
});

module.exports = router;

// DB Helper Functions

const insertSampleUserToUsers = (color, ip) => {
  var sampleuser = { name: color, timestamp: new Date(), userID: uuid(), ip: ip };
  db.collection(params.usersCollectionName).insertOne(sampleuser, function (err, res) {
    if (err) throw err;
    console.log('1 document inserted');
  });
};

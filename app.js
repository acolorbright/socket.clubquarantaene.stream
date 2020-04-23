const express = require('express');
const app = express();
const generalRoutes = require('./api/routes/generalRoutes');
// eslint-disable-next-line no-unused-vars
const params = require('./api/params.js');
const rooms = require('./api/rooms.js');
// eslint-disable-next-line no-unused-vars
require('dotenv').config();

// CORS //
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // to restrict it later second argument: 'https://blabla'
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    // the browser makes a request first to check if he can make the request
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    return res.status(200).json({});
  }
  next();
});

// EXPRESS SETUP//
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use('/v1/', generalRoutes); // general routes
// app.use('/socket/', SocketRoutes); // chat

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/toilets', (req, res) => {
  res.render('toilets', { roomName: 'toilets' });
});

// ROUTES//
app.get('/mainfloor', (req, res) => {
  res.render('mainfloor', { roomName: 'mainfloor' });
});

app.get('/toilets', (req, res) => {
  res.render('toilets', { roomName: 'toilets' });
});

app.get('/toilets/:room', (req, res) => {
  // if room doesn't exist, go back to toilets
  if (rooms[req.params.room] == null) {
    return res.redirect('../toilets');
  }

  // also skip /mainfloor /toilets
  if (req.params.room === 'mainfloor' || req.params.room === 'toilets' || req.params.room === 'lostandfound') {
    return res.redirect('../toilets');
  }

  // check if room full
  let amountOfUsers = Object.keys(rooms[req.params.room].users).length;
  if (amountOfUsers >= params.maxUsersPerCubicle) {
    return res.redirect('../toilets');
  }

  // go to cubicle
  res.render('cubicle', { roomName: req.params.room });
});

app.get('/secretlogin', (req, res) => {
  res.render('login');
});

app.get('/lostandfound', (req, res) => {
  res.render('lostandfound', {});
});

// STATIC SITES //
// app.use('/apitest', express.static(__dirname + '/testapi'));

// DEV PLUGINS //
if (process.env.NODE_ENV !== 'production') {
  // http logging
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

// ROUTING FALLBACK //
app.use((req, res, next) => {
  // anything that gets passed the routes
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // next needs to stay
  // this passes if any other error happens in the application
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

// eslint-disable-next-line no-unused-vars
require('dotenv').config();

const express = require('express');
const app = express();
const generalRoutes = require('./api/routes/generalRoutes');

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

// FILE ACCESS //
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// JS //
app.use('/v1/', generalRoutes); // general routes
// app.use('/socket/', SocketRoutes); // chat

// ROUTES//
app.get('/mainfloor', function (req, res) {
  res.render('mainfloor', {});
});

app.get('/toilets', function (req, res) {
  res.render('toilets', {});
});

app.get('/lostandfound', function (req, res) {
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

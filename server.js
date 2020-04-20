require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 1337;
const ip = process.env.IP || '127.0.0.1';
const server = http.createServer(app);

// eslint-disable-next-line no-unused-vars
const sockets = require('./api/chat')(server);

server.listen(port, ip, function () {
  console.log(`Server started at ${ip} on port: ${port}`);
});

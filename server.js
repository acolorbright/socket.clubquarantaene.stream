require('dotenv').config();
const http = require('http');
// http.globalAgent.maxSockets = Infinity;
const app = require('./app');

const port = process.env.PORT || 1337;
const ip = process.env.IP || '127.0.0.1';
const server = http.createServer(app);
const socketPort = process.env.SOCKETPORT || 1337;

const io = require('socket.io')(server);
// eslint-disable-next-line no-unused-vars
const sockets = require('./api/chat')(io, {
  transports: 'websocket',
});

server.listen(port, ip, function () {
  console.log(`Server started at ${ip} on port: ${port} and socket on port: ${socketPort}.`);
});

module.exports = (server) => {
  // eslint-disable-next-line global-require
  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log(`Socket connected: ${socket.id}`);
  });
};

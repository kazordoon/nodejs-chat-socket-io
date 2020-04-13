/* eslint-disable no-console */
module.exports = (server) => {
  // eslint-disable-next-line global-require
  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('onlineUser', (username) => {
      console.log(`The user "${username}" is online`);
    });

    socket.on('sendMessage', (data) => {
      socket.broadcast.emit('receiveMessage', data);
    });
  });
};

/* eslint-disable no-console */
const Message = require('../models/Message');

module.exports = (server) => {
  // eslint-disable-next-line global-require
  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('onlineUser', async (username) => {
      console.log(`The user "${username}" is online`);

      const messages = await Message.find();
      socket.emit('loadMessages', messages);
    });

    socket.on('sendMessage', async (data) => {
      await Message.create({
        author: data.username,
        content: data.message,
      });

      socket.broadcast.emit('receiveMessage', data);
    });
  });
};

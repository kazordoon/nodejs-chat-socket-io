/* eslint-disable no-console */
const Message = require('../models/Message');
const User = require('../models/User');

module.exports = (server) => {
  // eslint-disable-next-line global-require
  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('onlineUser', async (username) => {
      console.log(`The user "${username}" is online`);

      const messages = await Message.find().populate('user', ['username']);
      socket.emit('loadMessages', messages);
    });

    socket.on('sendMessage', async (data) => {
      try {
        const user = await User.findOne({ username: data.username });

        await Message.create({
          user: user.id,
          content: data.message,
        });
      } catch (err) {
        console.error(`Error saving the message: ${err.message}`);
      }

      socket.broadcast.emit('receiveMessage', data);
    });
  });
};

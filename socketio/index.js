module.exports = function(server) {
  const io = require('socket.io')(server)

  io.on('connection', async (socket) => {
    socket.on('card read', async (data, fn) => {
    });
  });

  return io;
}

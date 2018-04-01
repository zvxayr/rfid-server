const Interaction = require('../api/controller/Interaction')

module.exports = function(io) {
    io.on('connection', async socket => {
        socket.on('card read', async (data, fn) => {
        })
    })
}
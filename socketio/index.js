const socketio = require('socket.io')
const Interaction = require('../api/controller/Interaction')

module.exports = function(server) {
    global.io = socketio(server)
    
    io.on('connection', async socket => {
        socket.on('card read', async data => {
            if (data == '2014-0001')
                io.emit('accept', data)
            else
                io.emit('reject', data)
        })
    })
}
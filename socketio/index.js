const socketio = require('socket.io')

function factory(server) {
    io = socketio(server)
    
    io.on('connection', async function(socket) {
        // console.log('connected')
    })
}

module.exports = factory
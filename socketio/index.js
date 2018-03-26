const Interaction = require('../api/controller/Interaction')

module.exports = function(io) {
    io.on('connection', async socket => {
        socket.on('card read', async (data, fn) => {
            if (data == '80152FA4')
            	fn('accept')
            else 
                fn('reject')
        })
    })
}
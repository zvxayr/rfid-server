const fs = require('fs-extra')

let prefix = ''

function route(router) {
    router.get('/', async (ctx) => {
        ctx.body = await fs.readFile('./views/root.html', 'utf8')
    })

    router.post('/', async (ctx) => {
    	console.log(ctx.request.body)
    	ctx.body = 'received data!'
    })

    return router
}

module.exports = {
    prefix, route
}
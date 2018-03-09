const fs = require('fs-extra')

let prefix = ''

function route(router) {
    router.get('/', async ctx => {
        ctx.body = await fs.readFile('./views/home.html', 'utf8')
    })

    return router
}

module.exports = {
    prefix, route
}
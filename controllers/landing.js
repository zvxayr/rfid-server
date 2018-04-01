const fs  = require('fs-extra')

let prefix = ''

function route(router) {
    router.get('/', async ctx => {
        ctx.body = await ctx.render('landing')
    })

    router.get('/test', async ctx => {
        ctx.body = await ctx.render('test')
    })

    return router
}

module.exports = {
    prefix, route
}
const fs  = require('fs-extra')

let prefix = ''

function route(router) {
    router.get('/', async ctx => {
        ctx.body = await ctx.render('landing')
    })

    router.get('/test', async ctx => {
        ctx.body = await ctx.render('test')
    })

    router.get('/logout', async ctx => {
        ctx.session = null
        ctx.redirect('/login')
    })

    return router
}

module.exports = {
    prefix, route
}
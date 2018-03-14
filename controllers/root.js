const ejs = require('ejs')
const fs  = require('fs-extra')

let prefix = ''

function route(router) {
    router.get('/', async ctx => {
    	ctx.body = await ctx.render('dashboard')
    })

    router.get('/test', async ctx => {
    	ctx.body = await ctx.render('test')
    })

    return router
}

module.exports = {
    prefix, route
}
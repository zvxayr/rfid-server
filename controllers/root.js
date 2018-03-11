const ejs = require('ejs')
const fs  = require('fs-extra')

let prefix = ''

function route(router) {
    router.get('/', async ctx => {
    	ctx.body = await ctx.render('dashboard')
    })

    return router
}

module.exports = {
    prefix, route
}
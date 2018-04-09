const fs  = require('fs-extra')
const { requireLogin } = require('../middlewares.js')

let prefix = '/settings'

function route(router) {
    router.get('/', requireLogin, async ctx => {
        const data = {
            username: ctx.user.username,
            fullname: ctx.user.name,
            title: 'Settings',
            styles: ['settings']
        }

        if (ctx.session.admin) {
            const contents = await ctx.render('settings/admin')
            return ctx.body = await ctx.render('admin', { contents, ...data })
        }

        if (ctx.session.user) {
            const contents = await ctx.render('settings/user')
            return ctx.body = await ctx.render('user', { contents, ...data })
        }
    })

    return router
}

module.exports = {
    prefix, route
}
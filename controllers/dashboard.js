const fs  = require('fs-extra')
const { requireLogin } = require('../middlewares.js')

let prefix = '/dashboard'

function route(router) {
    router.get('/', requireLogin, async ctx => {
        const data = {
            username: ctx.user.username,
            fullname: ctx.user.name,
            title: 'Dashboard',
            styles: ['dashboard']
        }

        if (ctx.session.admin) {
            const contents = await ctx.render('dashboard/admin')
            return ctx.body = await ctx.render('admin', { contents, ...data })
        }

        if (ctx.session.user) {
            const contents = await ctx.render('dashboard/user')
            return ctx.body = await ctx.render('user', { contents, ...data })
        }
    })

    return router
}

module.exports = {
    prefix, route
}
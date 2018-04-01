const models    = require('../models')
const fs        = require('fs-extra')

let prefix = '/login'

function route(router) {
    router.get('/', async ctx => {
        ctx.body = await ctx.render('login')
    })

    router.post('/', async ctx => {
        const { username, password } = ctx.request.body
        let user = null

        user = await models.Admin.findOne({ username })
        if (user && user.authenticate(password)) {
            // user is an admin
            ctx.body = 'admin'
            return
        }

        user = await models.User.findOne({ username })
        if (user && user.authenticate(password)) {
            // user is a student
            ctx.body = 'student'
            return
        }

        // invalid credential
        ctx.body = 'none'
    })

    return router
}

module.exports = {
    prefix, route
}
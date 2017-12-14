const Router    = require('koa-router')
const compose   = require('koa-compose')
const fs        = require('fs')
const path      = require('path')

function factory() {
    let routes = fs
            .readdirSync(__dirname)
            .filter(file => path.extname(file) == '.js' && path.basename(file, '.js') != 'index')
            .map(file => {
                let { prefix, route } = require(`./${file}`)
                let router = route(new Router({ prefix }), ...arguments)

                return [router.routes(), router.allowedMethods()]
            })
            .reduce((acc, val) => acc.concat(val), [])

    return compose(routes)
}

module.exports = factory
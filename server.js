const Koa            = require('koa')
const serve          = require('koa-static')
const logger         = require('koa-logger')
const bodyparser     = require('koa-bodyparser')
const methodoverride = require('koa-methodoverride')
const models         = require('./models')
const controller     = require('./controllers')

const app = new Koa()

app.use(methodoverride())
app.use(logger())
app.use(bodyparser())
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
    }
});
app.use(serve('./public'))
app.use(controller())

app.listen(8000)

module.exports = app
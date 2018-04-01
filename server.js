const ejs            = require('ejs')
const fs             = require('fs-extra')
const http           = require('http')
const Koa            = require('koa')
const bodyparser     = require('koa-bodyparser')
const helmet         = require('koa-helmet')
const logger         = require('koa-logger')
const methodoverride = require('koa-methodoverride')
const serve          = require('koa-static')

const api            = require('./api')
const controller     = require('./controllers')
const handleerror    = require('./error')

const app    = new Koa()
const server = http.createServer(app.callback())
const io     = require('socket.io')(server)

require('./socketio')(io)

app.context.render = async (path, data, options) => {
    let template = await fs.readFile(`./views/${path}.ejs`, 'utf8')

    return ejs.render(template, data, options)
}

app.use(helmet())
app.use(methodoverride())
app.use(logger())
app.use(bodyparser())
app.use(handleerror())
app.use(serve('./public'))
app.use(controller())
app.use(api())

server.listen(8080)
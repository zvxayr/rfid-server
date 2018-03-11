const Koa            = require('koa')
const serve          = require('koa-static')
const logger         = require('koa-logger')
const bodyparser     = require('koa-bodyparser')
const methodoverride = require('koa-methodoverride')
const fs             = require('fs-extra')
const http           = require('http')
const ejs            = require('ejs')

const app    = new Koa()
const server = http.createServer(app.callback())

const handleerror = require('./error')
const controller  = require('./controllers')
const api         = require('./api')

require('./socketio')(server)

app.context.render = async (path, data, options) => {
	let template = await fs.readFile(`./views/${path}.ejs`, 'utf8')

	return ejs.render(template, data, options)
}

app.use(methodoverride())
app.use(logger())
app.use(bodyparser())
app.use(handleerror());
app.use(serve('./public'))
app.use(controller())
app.use(api())

server.listen(8080)
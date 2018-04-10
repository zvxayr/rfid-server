require('./init')

const ejs            = require('ejs');
const fs             = require('fs-extra');
const http           = require('http');
const Koa            = require('koa');
const bodyparser     = require('koa-bodyparser');
const helmet         = require('koa-helmet');
const logger         = require('koa-logger');
const methodoverride = require('koa-methodoverride');
const session        = require('koa-session');
const serve          = require('koa-static');

const api            = require('./api');
const controller     = require('./controllers');
const handleerror    = require('./error');

const app    = new Koa();
const server = http.createServer(app.callback());

app.keys = [process.env.secret];

app.context.db = require('./models');
app.context.io = require('./socketio')(server);
app.context.render = async (path, data, options) => {
    const filename = `${__dirname}/views/${path}.ejs`;
    const template = await fs.readFile(filename, 'utf8');
    return ejs.render(template, data, options);
}

app.use(async (ctx, next) => {
    const objectId = ctx.db.mongoose.Types.ObjectId;

    if (ctx.session.admin) {
        ctx.user = await ctx.db.Admin.findById(objectId(ctx.session.id));
    }

    if (ctx.session.user) {
        ctx.user = await ctx.db.User.findById(objectId(ctx.session.id));
    }

    await next();
})

app.use(helmet());
app.use(session(app));
app.use(methodoverride());
app.use(logger());
app.use(bodyparser());
app.use(handleerror());
app.use(serve('./public'));
app.use(controller());
app.use(api());

server.listen(8080);
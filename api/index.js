const Router  = require('koa-router');
const compose = require('koa-compose');
const flatten = require('array-flatten');
const fs      = require('fs');
const path    = require('path');

function factory() {
    const apiRouter = new Router({ prefix: '/api' });

    const routes = fs
        .readdirSync(path.join(__dirname, 'routes'))
        .filter(file => path.extname(file) == '.js')
        .map(file => {
            const route = require(`./routes/${file}`);
            const router = route(apiRouter, ...arguments);

            return [router.routes(), router.allowedMethods()];
        });

    return compose(flatten(routes));
}

module.exports = factory;

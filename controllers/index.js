const Router  = require('koa-router');
const compose = require('koa-compose');
const flatten = require('array-flatten');
const fs      = require('fs');
const path    = require('path');

function factory(...args) {
  const routes = fs
    .readdirSync(__dirname)
    .filter(file => path.extname(file) == '.js' && path.basename(file, '.js') != 'index')
    .map(file => {
      const { prefix, route } = require(`./${file}`);
      const router = route(new Router({ prefix }), ...args);
      
      return [router.routes(), router.allowedMethods()];
    });

  return compose(flatten(routes));
}

module.exports = factory;

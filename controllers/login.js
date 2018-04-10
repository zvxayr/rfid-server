const models    = require('../models');
const fs        = require('fs-extra');

let prefix = '/login';

function route(router) {
  router.get('/', async (ctx) => {
    ctx.body = await ctx.render('login');
  });

  router.post('/', async (ctx) => {
    const { username, password } = ctx.request.body;
    let user = null;

    delete ctx.session.admin;
    delete ctx.session.user;

    user = await models.Admin.findOne({ username });
    if (user && await user.authenticate(password)) {
      ctx.session.admin = true;
      ctx.session.id = user.id;
      ctx.divert('/dashboard');
      console.log(ctx.body, ctx.status);
      return;
    }

    user = await models.User.findOne({ username });
    if (user && await user.authenticate(password)) {
      ctx.session.user = true;
      ctx.session.id = user.id;
      ctx.divert('/dashboard');
      return;
    }

    ctx.status = 403;
    ctx.body = { error: 'invalid username or password' };
  });

  return router;
}

module.exports = {
  prefix,
  route
};

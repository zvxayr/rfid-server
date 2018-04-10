const fs  = require('fs-extra');
const { requireLogin } = require('../middlewares.js');

let prefix = '/settings';

function route(router) {
  router.get('/', requireLogin, async (ctx) => {
    const data = {
      username: ctx.user.username,
      fullname: ctx.user.name,
      title: 'Settings',
      styles: ['settings']
    };

    if (ctx.session.admin) {
      const contents = await ctx.render('settings/admin', ctx.user);
      return ctx.body = await ctx.render('admin', { contents, ...data });
    }

    if (ctx.session.user) {
      const contents = await ctx.render('settings/user', ctx.user);
      return ctx.body = await ctx.render('user', { contents, ...data });
    }
  });

  router.post('/username', requireLogin, async (ctx) => {
    const username = ctx.request.body.username;

    if (username == ctx.user.username) return ctx.status = 204;
    if (await ctx.db.Admin.findOne({ username })) return ctx.throw(409);
    if (await ctx.db.User.findOne({ username })) return ctx.throw(409);

    await ctx.user.set({ username }).save();
    ctx.status = 204;
  });

  router.post('/password', requireLogin, async (ctx) => {
    const password = ctx.request.body.password;

    await ctx.user.set({ password }).save();
    ctx.status = 204;
  });

  return router;
}

module.exports = {
  prefix,
  route
};

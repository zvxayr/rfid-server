const fs  = require('fs-extra');
const { requireLogin } = require('../middlewares.js');

let prefix = '/people';

function route(router) {
  router.get('/', requireLogin, async (ctx) => {
    const data = {
      username: ctx.user.username,
      fullname: ctx.user.name,
      title: 'People',
    };

    if (ctx.session.admin) {
      const style = ['people'];
      const contents = await ctx.render('people/admin');
      return ctx.body = await ctx.render('admin', { style, contents, ...data });
    }
  });

  router.get('/search', requireLogin, async (ctx) => {
    if (ctx.session.admin) {
      const query = new RegExp(`.*${ctx.request.query.q}.*`);
      ctx.body = await ctx.db.User.find({ name: query });
    }
  });

  router.get('/:username', requireLogin, async (ctx) => {
    if (ctx.session.admin) {
      const user = await ctx.db.User.findOne({ username: ctx.params.username });
      const count = await ctx.db.Interaction.find({ userID: user.id }).count();

      ctx.body = await ctx.render('people/individual', { count });
    }
  });

  return router;
}

module.exports = {
  prefix,
  route
};

const fs  = require('fs-extra');
const { requireLogin } = require('../middlewares.js');

const prefix = '/dashboard';

function route(router) {
  router.get('/', requireLogin, async (ctx) => {
    const data = {
      username: ctx.user.username,
      fullname: ctx.user.name,
      title: 'Dashboard',
    };

    if (ctx.session.admin) {
      const style = ['dashboard'];
      const count = await ctx.db.Interaction.find().count();
      const contents = await ctx.render('dashboard/admin', {count});
      return ctx.body = await ctx.render('admin', { style, contents, ...data });
    }

    if (ctx.session.user) {
      const style = ['dashboard'];
      const count = await ctx.db.Interaction.find({userID: ctx.user.id}).count();
      const contents = await ctx.render('dashboard/user', {count});
      return ctx.body = await ctx.render('user', { style, contents, ...data });
    }
  });

  return router;
}

module.exports = {
  prefix,
  route
};

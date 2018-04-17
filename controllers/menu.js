const fs  = require('fs-extra');
const {requireLogin} = require('../middlewares.js');
const {Menu, Meal} = require('../models');

let prefix = '/menu';

const getDay = function getDay(now, day) {
  const date = new Date(now);
  const currentDay = date.getDay();
  const distance = day - currentDay;
  date.setDate(date.getDate() + distance);
  return date;
}

function route(router) {
  router.get('/', requireLogin, async (ctx) => {
    const data = {
      username: ctx.user.username,
      fullname: ctx.user.name,
      title: 'Menu',
    };

    const menu = (await Menu
      .find({}, {name: 1}))
      .sort((a, b) => a.name.localeCompare(b.name));
    const now = new Date();
    const week = [0, 1, 2, 3, 4, 5, 6]
      .map(day => getDay(now, day))
      .map(d => [d.getFullYear(), d.getMonth(), d.getDate()])
      .map(String);
    const meals = await Meal.find({date: {$in: week}});
    
    if (ctx.session.admin) {
      const style = ['menu'];
      const contents = await ctx.render('menu/admin', {menu, meals});
      return ctx.body = await ctx.render('admin', {style, contents, ...data});
    }

    if (ctx.session.user) {
      const style = ['menu'];
      const contents = await ctx.render('menu/user', {menu, meals});
      return ctx.body = await ctx.render('user', {style, contents, ...data});
    }
  });

  router.post('/newmenu', requireLogin, async (ctx) => {
    if (!ctx.session.admin) return;
    const name = ctx.request.body.menu;
    if (await Menu.findOne({name})) {
      ctx.body = {error: 'Menu already exists'};
      ctx.status = 409;
      return;
    }

    await new Menu({ name }).save();
    ctx.status = 204;
  });

  router.post('/addmeal', requireLogin, async (ctx) => {
    if (!ctx.session.admin) return;
    const {date, meal, menu: name} = ctx.request.body;
    const [match, menu] = await Promise.all([
      Meal.findOne({date, meal}),
      Menu.findOne({name})
    ]);

    if (match) {
      await match.set({menuID: menu._id}).save();
      return ctx.status = 204;
    }

    await new Meal({date, meal, menuID: menu._id}).save();
    ctx.status = 200;
  });

  return router;
}

module.exports = {
  prefix,
  route
};

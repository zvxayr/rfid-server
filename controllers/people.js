const fs  = require('fs-extra');
const { requireLogin } = require('../middlewares.js');

let prefix = '/people';

function route(router) {
    router.get('/', requireLogin, async (ctx) => {
        const data = {
            username: ctx.user.username,
            fullname: ctx.user.name,
            title: 'People',
            styles: ['people']
        };

        if (ctx.session.admin) {
            const contents = await ctx.render('people/admin');
            return ctx.body = await ctx.render('admin', { contents, ...data });
        }
    });

    return router;
}

module.exports = {
    prefix,
    route
};
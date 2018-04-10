exports.requireLogin = async (ctx, next) => {
    if (!ctx.user) return ctx.redirect('/login');

    await next();
}
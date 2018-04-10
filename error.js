const lookup = {
  'ENOENT': 404
}

async function handleError(ctx, next) {
  try {
    await next();
    if (ctx.body) return;
    
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;

    if (err.code in lookup) {
      ctx.status = lookup[err.code];
    }

    ctx.body = err.message;
  }
}

function middleware() {
  return handleError;
}

module.exports = middleware;

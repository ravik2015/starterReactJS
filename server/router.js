'use strict';

const Router = require('koa-router');

/**
 * @param {Router.IRouterOptions} opts
 * @returns {Router}
 */
const routerFactory = opts => {
  const router = new Router(opts);

  router.get('*', ctx => (ctx.body = '418 I am a teapot.')); // example

  return router;
};

module.exports = routerFactory;

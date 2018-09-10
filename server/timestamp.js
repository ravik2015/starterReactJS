'use strict';

/**
 * @param {KoaContext} ctx
 * @param {Function} next
 */
module.exports = async (ctx, next) => {
  ctx.response.set('x-apptimestamp', new Date().toISOString());
  await next();
};

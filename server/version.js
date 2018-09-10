'use strict';

const { version } = require('../package');

/**
 * @param {KoaContext} ctx
 * @param {Function} next
 */
module.exports = async (ctx, next) => {
  ctx.response.set('x-appversion', version);
  await next();
};

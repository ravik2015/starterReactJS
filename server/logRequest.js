'use strict';

const log = require('./logger');

/**
 * @param {KoaContext} ctx
 * @param {Function} next
 */
module.exports = async (ctx, next) => {
  const { method, originalUrl } = ctx.request;
  log.info('Request start method=%s url=%s', method, originalUrl);
  const t = log.startTimer();

  let err;
  try {
    await next();
  } catch (e) {
    err = e;
  }

  const { status } = ctx.response;
  t.done({
    message: `Request finish method=${method} url=${originalUrl} statusCode=${status}`
  });

  if (err) {
    throw err;
  }
};

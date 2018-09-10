'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const ejs = require('koa-ejs');
const promisifyEvents = require('bluebird-events');
const path = require('path');
const log = require('./logger');

const StaticLoader = require('./StaticLoader');
// const routerFactory = /** @type {function():Router} */ require('./router');
const logRequest = require('./logRequest');
const timestamp = require('./timestamp');
const version = require('./version');

/**
 * @typedef {Object} KoaStaticOptions
 * @property {string} root
 * @property {serve.Options} opts
 */

/**
 * @typedef {Object} HttpServerConfig
 * @property {string} [context=/]
 * @property {string} ip
 * @property {number} port
 * @property {number} timeout
 * @property {KoaStaticOptions} static
 * @property {Object} apiUrls
 * @property {string} apiUrls.core
 * @property {string} apiUrls.inventory
 * @property {Object} auth0
 * @property {string} auth0.domain
 * @property {string} auth0.clientId
 * @property {string} auth0.callbackUri
 */

/**
 * @typedef {Application.Context} KoaContext
 * @property {Object} params
 * @property {Object} query
 * @property {Function} render
 */

class HttpServer {
  /**
   * @param {HttpServerConfig} config
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * @returns {Application}
   */
  start() {
    this.app = new Koa();
    this._loadMains();
    this._addMiddleware();
    return this._listen();
  }

  /**
   * @private
   */
  _loadMains() {
    const staticPath = path.resolve(this.config.static.root, 'static');
    log.info('Using static path "%s"', staticPath);

    this.mainJs = StaticLoader.fetchMainJsFile(staticPath);
    log.info('Found main script "%s"', this.mainJs);

    this.mainCss = StaticLoader.fetchMainCssFile(staticPath);
    log.info('Found main stylesheet "%s"', this.mainCss);
  }

  /**
   * @param {KoaContext} ctx
   * @private
   */
  async _render(ctx) {
    const { apiUrls, auth0, context } = this.config;
    await ctx.render('index', {
      APP_CONFIG: {
        apiUrls,
        auth0,
        context
      },
      CONTEXT: this.config.context,
      MAIN_CSS: this.mainCss,
      MAIN_JS: this.mainJs
    });
  }

  /**
   * @returns {Application}
   * @private
   */
  _addMiddleware() {
    // const router = routerFactory({prefix: this.config.context});

    ejs(this.app, {
      root: path.resolve(__dirname, 'view'),
      layout: false,
      viewExt: 'ejs',
      cache: true
    });

    return this.app
      .use(logRequest)
      .use(version)
      .use(timestamp)
      .use(serve(this.config.static.root, this.config.static.opts))
      .use(this._render.bind(this));
    // .use(router.routes())
    // .use(router.allowedMethods());
  }

  _listen() {
    this.netServer = this.app.listen(this.config.port, this.config.ip);
    this.netServer.setTimeout(this.config.timeout);
    return promisifyEvents(this.netServer, {
      reject: ['error', 'close'],
      resolve: 'listening'
    });
  }
}

/**
 * @type {Application}
 */
HttpServer.prototype.app = null;

/**
 * @type {HttpServerConfig}
 */
HttpServer.prototype.config = null;

/**
 * @type {http.Server | Server}
 */
HttpServer.prototype.netServer = null;

/**
 * @type {string}
 */
HttpServer.prototype.mainJs = '';

/**
 * @type {string}
 */
HttpServer.prototype.mainCss = '';

module.exports = HttpServer;

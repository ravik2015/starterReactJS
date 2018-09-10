'use strict';

const path = require('path');

/**
 * @typedef {Object} PnCoreConfig
 * @property {string} env
 * @property {HttpServerConfig} http
 */

/**
 * @type {PnCoreConfig}
 */
const config = {
  env: '',
  http: {
    apiUrls: {
      local: 'http://localhost:3000/api'
    },
    auth0: {
      domain: 'core-demo.auth0.com',
      clientId: '6boi5vCiTh5TeK11b0RQQcQTlD007Lzq',
      clientSecret: 'Ve8HkN9RgXp2QdZIu_qJO06FrIYc2ekG2SYe2ci_xL5NmQQTl9P0U-fwLgFAIFX_',
      callbackUri: 'http://localhost:3000/callback'
    },
    context: '',
    ip: '0.0.0.0',
    port: 8080,
    timeout: 1000 * 60 * 2, // 2 minutes
    static: {
      opts: {
        defer: false, // must be false to work with koa-ejs
        index: false
      },
      root: path.resolve(__dirname, '../build')
    }
  }
};

module.exports = config;

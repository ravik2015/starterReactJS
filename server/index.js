'use strict';

process.env.NODE_CONFIG_DIR = process.env.NODE_CONFIG_DIR || process.cwd() + '/config-server';

const config = require('config');
const log = require('./logger');
const HttpServer = require('./HttpServer');

(async function start() {
  log.info('Starting server in environment "%s"...', config.get('env'));
  const appServer = new HttpServer(config.get('http'));
  await appServer.start();
  log.info(
    'Server started up successfully, listening on %s:%d.',
    appServer.config.ip,
    appServer.config.port
  );
})();

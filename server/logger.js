'use strict';

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(format.splat(), format.timestamp(), format.json()),
  transports: [new transports.Console()]
});

module.exports = logger;

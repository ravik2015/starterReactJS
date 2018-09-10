'use strict';

const config = {
  http: {
    apiUrls: {
      staging: 'http://staging.com:4190/api'
    },
    auth0: {
      domain: 'core-demo.auth0.com',
      clientId: '-',
      clientSecret: '-',
      callbackUri: 'https://core-01.qa.procurenetworks.com/callback'
    }
  }
};

module.exports = config;

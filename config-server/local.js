'use strict';

const config = {
  http: {
    apiUrls: {
      local: 'http://localhost:3000/api'
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

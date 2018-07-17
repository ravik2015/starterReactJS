/*
 * @file: app-config.js
 * @description: It Contain app configration keys and environment path's.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 */

export const environment = {
  API_ROOT:
    window.location.protocol === 'https:'
      ? 'https://stagingsdei.com:4190/'
      : 'http://localhost:4190/',
  LOCAL_API_URL: 'localhost:4190',
  STAGING_API_URL: 'stagingsdei.com:4190'
};

/*
 * @file: RestClient.js
 * @description: Connection file for the application
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * */

import Connection from '../constants/Connection';
import querystring from 'querystring';
import axios from 'axios';

var config = {
  headers: { 'Content-Type': 'application/json' }
};

class RestClient {
  static post(url, params, token = '') {
    return new Promise(function(fulfill, reject) {
      config.headers['authorization'] = token;
      axios
        .post(Connection.getResturl(url), JSON.stringify(params), config)

        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static put(url, params, token = '') {
    config.headers['authorization'] = token;
    return new Promise(function(fulfill, reject) {
      axios
        .put(Connection.getResturl() + url, JSON.stringify(params), config)
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static delete(url, token = '') {
    config.headers['authorization'] = token;
    return new Promise(function(fulfill, reject) {
      axios
        .delete(Connection.getResturl() + url, config)
        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static get(url, params, token = '') {
    let query = querystring.stringify(params);
    config.headers['authorization'] = token;
    return new Promise(function(fulfill, reject) {
      axios
        .get(Connection.getResturl() + url + '?' + query, config)

        .then(function(response) {
          fulfill(response.data);
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data Method ***********/
  static postFormData(url, params, token = '') {
    config.headers['Content-Type'] = 'multipart/form-data';
    return new Promise(function(fulfill, reject) {
      var body = new FormData();
      body.append('attachment', params);

      axios
        .post(Connection.getResturl(url), body, config)

        .then(function(response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default RestClient;

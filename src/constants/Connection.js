/*
 * @file: Connection.js
 * @description: Connection file for the application
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * */

import { environment as PATH } from './app-config';

const httpUrl = PATH.LOCAL_API_URL;

class Connection {
  static getResturl(url) {
    return `${httpUrl}/${url}`;
  }
  static getBaseUrl() {
    return httpUrl;
  }
}

export default Connection;

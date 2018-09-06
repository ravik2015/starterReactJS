/*
 * @file: configureStore.js
 * @description: Configure redux store with environment
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}

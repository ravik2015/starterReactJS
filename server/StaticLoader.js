'use strict';

const fs = require('fs');
const log = require('./logger');

/**
 */
class StaticLoader {
  /**
   * @param {string} dir
   * @param {string} pattern
   * @returns {string}
   */
  static fetchFileWithPattern(dir, pattern) {
    try {
      const files = fs.readdirSync(dir);
      const results = files.filter(file => file.match(pattern));
      if (!results[0]) {
        throw new Error('No static file found');
      }
      return results[0];
    } catch (err) {
      log.error('file is not readable', err.stack);
    }
  }

  /**
   * @param {string} dir
   * @returns {string}
   */
  static fetchMainJsFile(dir) {
    return this.fetchFileWithPattern(dir.concat('/js'), this.MAIN_JS_CHUNK_REGEX);
  }

  /**
   * @param {string} dir
   * @returns {string}
   */
  static fetchMainCssFile(dir) {
    return this.fetchFileWithPattern(dir.concat('/css'), this.MAIN_CSS_CHUNK_REGEX);
  }
}

/**
 * @type {RegExp}
 */
StaticLoader.MAIN_JS_CHUNK_REGEX = /^main(?!.*\.chunk)(\..*)?\.js$/i;

/**
 * @type {RegExp}
 */
StaticLoader.MAIN_CSS_CHUNK_REGEX = /^main(?!.*\.chunk)(\..*)?\.css$/i;

module.exports = StaticLoader;

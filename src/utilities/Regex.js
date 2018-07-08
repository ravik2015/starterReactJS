/*
 * @file: Regex.js
 * @description: Regex used for validation in application.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * */

var Regex = {
  validateEmail: function(val) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    );
  },
  validateMultipleEmail: function(val) {
    return /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/.test(
      val
    );
  },
  validateMobile: function(val) {
    return /^\+?\d{9,12}$/.test(val);
  },
  validName: function(val) {
    return /^([a-zA-Z_ ]){1,15}$/.test(val);
  },
  validateFreeSpace: function(val) {
    return /^$|^[^\s]+(\s+[^\s]+)*$/.test(val);
  },
  validateMobileWithoutCC: function(val) {
    return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val);
  },
  validateString: function(val) {
    return /^([a-zA-Z ]){0,30}$/.test(val);
  },
  validatePassword: function(val) {
    return /^(?=.*[A-Za-z])(?=.*[0-9_-])[A-Za-z0-9_-]{6,8}$/.test(val);
  },
  validateNumbers: function(val) {
    return /^[0-9]{1,}$/.test(val);
  },
  validateInteger: function(val) {
    return /^\d*[1-9]\d*$/.test(val);
  },
  validateMessage: function(val) {
    return /^[A-Za-z 0-9 @!,:]{1,100}$/.test(val);
  },
  validateURL: function(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url
    );
  },
  validatePrice(val) {
    return /^(\d*([.,](?=\d{1}))?\d+)?$/.test(val);
  },
  validateTwoDecimalPlaces(val) {
    return /^(?:\d*\.\d{1,2}|\d+)$/.test(val);
  },
  validateAlphaNumberic(val) {
    return /^[a-zA-Z0-9 ]{0,30}$/.test(val);
  },
  validateAlphaNumbericWithoutSpace(val) {
    return /^[a-zA-Z0-9]{0,30}$/.test(val);
  },
  validateRoutingNumber(val) {
    return /^[0-9]{6}$/.test(val);
  },
  validateAccountNumber(val) {
    return /^[0-9]{7,8}$/.test(val);
  },
  getNumbericValuesFromString(val) {
    return val.match(/^\d+|\d+\b|\d+(?=\w)/g);
  }
};

module.exports = Regex;

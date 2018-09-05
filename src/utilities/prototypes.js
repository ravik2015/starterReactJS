/************* Captilize first character ************/
// eslint-disable-next-line
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/************* Captilize first character of word ************/
// eslint-disable-next-line
String.prototype.capitalizeEachLetter = function() {
  return this.split(' ')
    .map(function(word) {
      return word.capitalizeFirstLetter();
    })
    .join(' ');
};

/************* Get date without time ************/
// eslint-disable-next-line
Date.prototype._getDate = function() {
  return this.setHours(0, 0, 0, 0);
};

/********** Re-arrange array element ********/
// eslint-disable-next-line
Array.prototype.SHIFT = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

/*************** insert at a specific index *********/
// eslint-disable-next-line
String.prototype.insert = function(index, string) {
  if (index > 0) return this.substring(0, index) + string + this.substring(index, this.length);
  else return string + this;
};

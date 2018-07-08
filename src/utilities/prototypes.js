/************* Captilize first character ************/
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/************* Captilize first character of word ************/
String.prototype.capitalizeEachLetter = function() {
  return this.split(" ")
    .map(function(word) {
      return word.capitalizeFirstLetter();
    })
    .join(" ");
};

/************* Get date without time ************/
Date.prototype._getDate = function() {
  return this.setHours(0, 0, 0, 0);
};

/********** Re-arrange array element ********/
Array.prototype.SHIFT = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

/************* Get country ISO code by country code ************/
String.prototype.getISO = function() {
  let code = _.findWhere(codes, { code: this });
  if (code) {
    return code.iso;
  } else {
    return "";
  }
};

/*************** insert at a specific index *********/
String.prototype.insert = function(index, string) {
  if (index > 0)
    return (
      this.substring(0, index) + string + this.substring(index, this.length)
    );
  else return string + this;
};

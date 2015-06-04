/**
 * Add route here
 * @type {{method url: string}}
 */

var routesList = {
  'get /': 'homepage.index'
};



function loadFrom(path) {
  var cb = require('./' + path.split('.').join('/'));
  return function* () {
    typeof cb === 'function' ?
      cb.call(this) :
      this.status = 500;
  }
}

module.exports = Object.keys(routesList).reduce(function(hash, route) {
  hash[route] = loadFrom(routesList[route]);
  return hash;
}, {});
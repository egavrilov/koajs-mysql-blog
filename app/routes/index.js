/**
 * Add route here
 * @type {{method url: string}}
 */

var routesList = {
  'get /': 'homepage'
};



function loadFrom(path) {
  var cb = require('./' + path.split('.').join('/'));
  return function* (next) {
    typeof cb === 'function' ?
      cb.bind(this) :
      this.status = '500';
    yield next;
  }
}

module.exports = Object.keys(routesList).reduce(function(hash, route) {
  hash[route] = loadFrom(routesList[route]);
  return hash;
}, {});
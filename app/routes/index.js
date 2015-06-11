/**
 * Add route here
 * @type Object {'method /route/:param': 'path.to.route'}
 */

var routesList = {
  'get /': 'homepage',
  'get /404': 'service.404'
};



function loadFrom(path) {
  var cb = require('./' + path.split('.').join('/'));
  return function* () {
    typeof cb === 'function' ?
      cb.call(this) :
      this.status = 500;
  }
}

module.exports = Object.keys(routesList).reduce( (hash, route) => {
  hash[route] = loadFrom(routesList[route]);
  return hash;
}, {});
module.exports = function*() {
  this.status = 404;
  yield this.render('service/404', {});
};
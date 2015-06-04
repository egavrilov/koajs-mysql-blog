var pool = require('../core/getConnection')();

function create(params) {
  var needed = [params.uid, params.title, params.body];
  console.log(needed);
  return pool.execute('INSERT post SET uid=?, created_at=NOW(), title=?, body=?', needed, console.log);
}
module.exports = {
  create: create
};
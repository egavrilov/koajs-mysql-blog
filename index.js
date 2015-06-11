var koa = require('koa');
var helmet = require('koa-helmet');
var router = require('koa-router')();
var views = require('koa-views');

var app = module.exports = koa();
var db = require('./app/core/getConnection')();
var api = require('./app/api');
var routes = require('./app/routes');

// template middleware

app.use( views('app/views', {
  'default': 'jade'
}));

// logger
app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms, 'ms');
});

//XSS security
//app.use(helmet.csp());
//app.use(helmet.xframe('deny'));
//app.use(helmet.contentTypeOptions());
//app.use(helmet.iexss());
//app.use(helmet.ienoopen());
//app.use(helmet.cacheControl());
//app.use(helmet.permittedCrossDomainPolicies());

//get database connection
//db.query('create table `post` ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, created_at TIMESTAMP, title  VARCHAR(255) NOT NULL, body TEXT NOT NULL, uid INT UNSIGNED NOT NULL)', console.log);
//api.request('post.create', { body: 'some text', title: 'some title', uid: 1 });
//setTimeout(function() {
//  db.query('select * from post', console.log);
//},1000);
//

// response

for (var route of Object.keys(routes)) {
  var routeKey = route.split(' '),
    method = routeKey[0] || 'get',
    path = routeKey[1] || '/404';
  router[method](path, routes[route]);
}

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
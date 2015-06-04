function apiRequest(fullMethodPath, params, restrict){
  var methodParts = fullMethodPath.split('.'),
    file = require(['.', methodParts[0]].join('/')),
    method = file && file[ methodParts[1] ];

  if (file && method) {
    method(params)
  }

}

function apiDirect(req, res) {

}

module.exports = {
  direct: apiDirect,
  request: apiRequest
};
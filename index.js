'use strict';

require('babel-core/register')({});
require('promise.prototype.finally');

var server = require('./server').default;
var api    = require('chapters-server');

server.listen(3000, function () {
  console.log('React server listening on:', 3000);
});

api.start(function () {
  api.log('info', 'API server running at: ' + api.info.uri);
});


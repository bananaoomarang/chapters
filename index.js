'use strict';

var server = require('chapters-server');

server.start(function () {
  server.log('info', 'Server running at: ' + server.info.uri);
});

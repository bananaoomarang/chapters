#!/usr/bin/env node

var server = require('./server');

server.start(function () {

  return server.log('info', 'Server running at: ' + server.info.uri);

});

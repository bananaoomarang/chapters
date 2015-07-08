'use strict';

require('babel/register');

var server = require('./server');
var api    = require('chapters-server');

server.listen(3000, function () {
  console.log('Server listening on: ' + 3000);
});

api.start(function () {
    api.log('info', 'Server running at: ' + api.info.uri);
});


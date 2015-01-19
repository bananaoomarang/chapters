#!/bin/node

var Hapi         = require('hapi');
var Good         = require('good');
var goodConsole  = require('good-console');

var server = module.exports = new Hapi.Server();

server.connection({ port: 8888 });

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: goodConsole,
      args: [{ log: '*', response: '*' }]
    }]
  }
}, function (err) {
  if (err) {
    throw err;
  }
});

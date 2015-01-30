#!/bin/node

var Hapi           = require('hapi');
var Good           = require('good');
var goodConsole    = require('good-console');
var jwt            = require('jsonwebtoken');
var hapiJwt        = require('hapi-auth-jwt');
var accountManager = require('./accountManager');

var server = module.exports = new Hapi.Server();

server.connection({ port: 8888 });

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

var accounts = {
  1: {
    id: 1,
    user: 'milo',
    scope: ['admin']
  }
}

var privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc'

// For request
var token = jwt.sign({ accountId: 1 }, privateKey);

function validate (decodedToken, cb) {
  var error;
  var credentials = accounts[decodedToken.accountId] || {};

  if(!credentials) return cb(error, false, credentials);

  return cb(error, true, credentials);
}

server.register({
  register: hapiJwt
}, function (err) {

  if (err) throw err;

  server.auth.strategy('token', 'jwt', {
    key: privateKey,
    validateFunc: validate
  });

});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

server.route({
  method: 'POST',
  path: '/markdown',
  config: {
    auth: 'token'
  },
  handler: function handlePostMarkdown (request, reply) {
    reply('All good, bro');
  }
});

server.route({
  method: 'POST',
  path: '/user/create',
  handler: function handleCreateUser (req, reply) {
    var new_user = req.payload;

    accountManager.add(new_user, function confirmUserAdded (err, body) {
      if (err) return reply(err);

      return reply(body);
    });
  }
});

server.route({
  method: 'GET',
  path: '/user/list',
  handler: function handleListUsers (req, reply) {
    accountManager.list(function getUserList (err, body) {
      if (err) return reply(err);

      return reply(body);
    });
  }
});

server.route({
  method: 'GET',
  path: '/user/{name}',
  handler: function handleGetUser (req, reply) {
    accountManager.get(req.params.name, function getUser (err, body) {
      if (err) return reply(err);

      return reply(body);
    });
  }
});

var Hapi           = require('hapi');
var Good           = require('good');
var goodConsole    = require('good-console');
var jwt            = require('jsonwebtoken');
var hapiJwt        = require('hapi-auth-jwt');
var crypto         = require('crypto');
var async          = require('async');
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

// XXX
var privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc'

function validate (decodedToken, cb) {

  accountManager.get(decodedToken.user, function getUserCb (err, user_doc) {
    if(err) return cb(err, false, user_doc);

    return cb(null, true, user_doc);
  });

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
  method: 'POST',
  path: '/user/login',
  handler: function handleLogin (req, reply) {
    var user = req.payload;

    async.waterfall([
      function getUser (done) {
        accountManager.get(user.username, function getUser (err, body) {
          if (err) return done(err);

          return done(null, body);
        });
      },

      function hash (user_doc, done) {
        crypto.pbkdf2(user.password, user_doc.salt, user_doc.iterations, 20, function (err, key) {
          if(err) done(err);

          done(null, user_doc, key);
        });
      },

      function authenticate (user_doc, key, done) {

        if(user_doc.derived_key === key.toString('hex')) {

          console.log(user_doc);
          var token = jwt.sign({ user: user_doc.name }, privateKey, { expiresInMinutes: 10 });

          done(null, token);

        } else {

          done('Invalid Password');

        }
      }

    ], function (err, result) {
      if(err) return reply(err);

      return reply(null, result);
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

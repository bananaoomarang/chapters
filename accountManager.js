var db    = require('nano')('http://localhost:5984/_users');
var debug = require('debug')('accounts');

module.exports = {
  add: function (user, cb) {

    debug('creating %s', user.username);

    var doc = {
      _id      : 'org.couchdb.user:' + user.username,
      name     : user.username,
      type     : 'user',
      roles    : [],
      password : user.password
    };


    db.insert(doc, function couchInsert (err, body) {

      if (err) return cb(err);

      return cb(null, body);

    });

  },

  remove: function (username, cb) {

    debug('removing: %s', username);

    db.destroy(username, 'revision', function (err, body) {

      if (err) return cb(err);

      return cb(null, body);

    });

  },

  get: function (username, cb) {
    
    debug('getting: %s', username);

    db.get('org.couchdb.user:' + username, function (err, body, headers) {

      if (err) return cb(err);

      cb(null, body);

    });

  },

  list: function (cb) {

    db.list(function getDBList (err, body) {

      if(err) return cb(err);

      cb(null, body);

    });

  }
};

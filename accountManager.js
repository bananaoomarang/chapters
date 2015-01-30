var db = require('nano')('http://localhost:5984/accounts_couch');

module.exports = {
  add: function (user, cb) {

    db.insert({ email: user.email, password: user.password }, user.username, function couchInsert (err, body) {
      if (err) return cb(err);

      return cb(null, body);
    });

  },

  remove: function (username, cb) {
    console.log('removing: ' + username);

    db.destroy(username, 'dsa', function (err, body) {
      if (err) return cb(err);

      return cb(null, body);
    });

  },

  get: function (username, cb) {

    db.get(username, function (err, body, headers) {
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

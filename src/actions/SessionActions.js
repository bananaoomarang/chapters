'use strict';

var request       = require('superagent');
var AppDispatcher = require('../AppDispatcher');

function getToken (credentials, cb) {
  request
    .post('/users/login')
    .send(credentials)
    .end(function (err, res) {

      if (err) return cb(res.body.message);

      cb(null, res.text);

    });
}

var SessionActions = {

  open: function (credentials) {

    getToken(credentials, function (err, token) {
      if (err) {

        AppDispatcher.dispatch({
          actionType: 'session-invalid',
          error:      err
        });

      } else {

        AppDispatcher.dispatch({
          actionType: 'session-open',
          name:       credentials.username,
          token:      token
        });

      }
    });

  },

  // Check token is still legit
  validate: function (token) {
    request
      .get('/users/validate')
      .set('Authorization', 'Bearer ' + token)
      .end(function (err) {

        if (err) {

          AppDispatcher.dispatch({
            actionType: 'session-invalid',
            err:        err
          });

        } else {

          AppDispatcher.dispatch({
            actionType: 'session-open',
            token:      token
          });

        }

      });
  },

  close: function () {
    AppDispatcher.dispatch({
      actionType: 'session-close'
    });
  }
};

module.exports = SessionActions;

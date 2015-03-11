var please = require('please-ajax')(window);
var AppDispatcher = require('../AppDispatcher');

function getToken (credentials, cb) {
  var handlers = {
    success: function (data) {
      var token = data.data;

      cb(null, token);
    },
    error: function (err) {
      cb(err);
    }
  };

  please.post('/user/login', JSON.stringify(credentials), handlers)
};

var SessionActions = {

  open: function (credentials) {

    getToken(credentials, function (err, token) {
      if (err) {

        AppDispatcher.dispatch({
          actionType: 'session-invalid'
        });

      } else {
        
        AppDispatcher.dispatch({
          actionType: 'session-open',
          name: credentials.username,
          token: token
        });

      }
    });

  },

  close: function () {
    AppDispatcher.dispatch({
      actionType: 'session-close'
    });
  }
}

module.exports = SessionActions;

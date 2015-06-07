'use strict';

var request       = require('superagent');
var AppDispatcher = require('../AppDispatcher');

var UsersActions = {

  getUsers: function () {

    request
      .get('/users')
      .end(function (err, res) {
        if (err) return console.error(err);

        AppDispatcher.dispatch({
          actionType: 'users-list',
          list:       res.body
        });
      });

  }

};

module.exports = UsersActions;

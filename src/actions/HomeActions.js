'use strict';

var request          = require('superagent');
var AppDispatcher    = require('../AppDispatcher');

var HomeActions = {

  // Load stories
  loadStories: function () {

    request
      .get('/stories')
      .end(function (err, res) {
        if (err) return console.error(err);

        AppDispatcher.dispatch({
          actionType: 'home-stories',
          stories:    res.body
        });
      });
  }

};

module.exports = HomeActions;

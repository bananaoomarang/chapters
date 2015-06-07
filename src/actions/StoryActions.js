'use strict';

var request          = require('superagent');
var AppDispatcher    = require('../AppDispatcher');

var EditorActions = {

  // Set whether the to display loading interface
  setLoading: function (bool) {

    AppDispatcher.dispatch({
      actionType: 'editor-load',
      isLoading:  bool
    });

  },

  // Load story from backend
  loadStory: function (id) {
    var sessionToken = window.sessionStorage.getItem('token');

    request
      .get('/stories/' + id)
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err, res) {
        if (err) return console.error(err);

        console.log(res.body);

        AppDispatcher.dispatch({
          actionType: 'story-current',
          story:      res.body
        });
      });
  },

  loadUserStories: function (username) {
    var sessionToken = window.sessionStorage.getItem('token');

    request
      .get('/users/' + username + '/stories')
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err, res) {
        if (err) return console.error(err);

        AppDispatcher.dispatch({
          actionType: 'story-load-user',
          stories:    res.body
        });

      });
  }

};

module.exports = EditorActions;

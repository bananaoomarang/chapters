'use strict';

var request       = require('superagent');
var AppDispatcher = require('../AppDispatcher');

var EditorActions = {

  // Take a guess?
  setFont: function (font) {

    AppDispatcher.dispatch({
      actionType: 'editor-font',
      font:       font
    });

  },

  // Set paragraph alignment
  setAlignment: function (alignment) {

    AppDispatcher.dispatch({
      actionType: 'editor-alignment',
      alignment:  alignment
    });

  },

  // Set whether the to display loading interface
  setLoading: function (bool) {

    AppDispatcher.dispatch({
      actionType: 'editor-load',
      isLoading:  bool
    });

  },

  // Set the story currently being edited
  setStory: function (id) {
    var sessionToken = window.sessionStorage.getItem('token');

    request
      .get('/story/' + id)
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err, res) {
        if (err) return console.error(err);

        AppDispatcher.dispatch({
          actionType: 'editor-story',
          story:      { text: res.text }
        });

      });


  },

  // Load a list of possibly editable stories for user
  populateStories: function () {
    var sessionToken = window.sessionStorage.getItem('token');

    request
      .get('/story')
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err, res) {
        if (err) return console.error(err);

        AppDispatcher.dispatch({
          actionType: 'editor-editableStories',
          stories:    res.body
        });

      });
  }

};

module.exports = EditorActions;

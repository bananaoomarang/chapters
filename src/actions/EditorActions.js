'use strict';

var request          = require('superagent');
var AppDispatcher    = require('../AppDispatcher');
var ParagraphActions = require('../actions/ParagraphActions.js');

function uploadNewStory(token, payload) {
  request
    .post('/stories/import')
    .send(payload)
    .set('Authorization', 'Bearer ' + token)
    .end(function (err) {
      if (err) return console.error(err);

      console.log('Successfully saved %s', payload.title);
  });
}

function updateStory(token, payload) {
  request
    .post('/stories/' + payload.id)
    .send(payload)
    .set('Authorization', 'Bearer ' + token)
    .end(function (err) {
      if (err) return console.error(err);

      console.log('Successfully saved %s', payload.title);
  });
}

var EditorActions = {

  // Set whether the to display loading interface
  setLoading: function (bool) {

    AppDispatcher.dispatch({
      actionType: 'editor-load',
      isLoading:  bool
    });

  },

  // Load story from backend
  fetchStory: function (id) {
    var sessionToken = window.sessionStorage.getItem('token');

    request
      .get('/stories/' + id)
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err, res) {
        if (err) return console.error(err);

        // I know action chains are bad. I'm sorry, K?
        ParagraphActions.setParagraphs(res.body.html);

        AppDispatcher.dispatch({
          actionType: 'editor-story',
          story:      {
            text: res.body.text
          }
        });
      });
  },

  // Set the story currently being edited from object
  setStory: function (obj) {

      AppDispatcher.dispatch({
        actionType: 'editor-story',
        story:      obj
      });

  },

  // Load a list of possibly editable stories for user
  populateStories: function () {
    var sessionToken = window.sessionStorage.getItem('token');

    request
      .get('/users/current/stories')
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err, res) {
        if (err) return console.error(err);

        AppDispatcher.dispatch({
          actionType: 'editor-editableStories',
          stories:    res.body
        });

      });
  },

  // Upload the story
  save: function (payload) {
    var sessionToken = window.sessionStorage.getItem('token');

    if(payload.id) {
      updateStory(sessionToken, payload);
    } else {
      uploadNewStory(sessionToken, payload);
    }
  }

};

module.exports = EditorActions;

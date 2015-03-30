'use strict';

var request          = require('superagent');
var AppDispatcher    = require('../AppDispatcher');
var ParagraphActions = require('../actions/ParagraphActions.js');

var EditorActions = {

  // Set whether the to display loading interface
  setLoading: function (bool) {

    AppDispatcher.dispatch({
      actionType: 'editor-load',
      isLoading:  bool
    });

  },

  // Set the story currently being edited
  setStory: function (obj) {
    var sessionToken = window.sessionStorage.getItem('token');

    if(obj.id) {

      request
        .get('/story/' + obj.id)
        .set('Authorization', 'Bearer ' + sessionToken)
        .end(function (err, res) {
          if (err) return console.error(err);

          // I know action chains are bad. I'm sorry, K?
          ParagraphActions.setParagraphs(res.text);

          AppDispatcher.dispatch({
            actionType: 'editor-story',
            story:      {
              title: obj.title,
              text:  res.text
            }
          });
      });

    } else {

      AppDispatcher.dispatch({
        actionType: 'editor-story',
        story:      obj
      });

    }
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
  },

  // Upload the story
  save: function (payload) {
    var sessionToken = window.sessionStorage.getItem('token');

    request
      .post('/story/upload')
      .send(payload)
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err) {
        if (err) return console.error(err);

        console.log('Successfully saved %s', payload.title);
      });
  }

};

module.exports = EditorActions;

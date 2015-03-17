var request       = require('superagent');
var AppDispatcher = require('../AppDispatcher');

var ToolbarActions = {

  // Take a guess?
  setFont: function (font) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-font',
      font: font
    });

  },

  // Set paragraph alignment
  setAlignment: function (alignment) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-alignment',
      alignment: alignment
    });

  },

  // Set whether the to display loading interface
  setLoading: function (bool) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-load',
      isLoading: bool
    });

  },

  // Set the story currently being edited
  setStory: function (obj) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-story',
      story: obj
    });

  },

  // Load a list of possibly editable stories for user
  populateStories: function (token) {
    var sessionToken = window.sessionStorage.getItem('token');

    request
      .get('/story/list')
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err, res) {
        if (err) return console.error(err);

        AppDispatcher.dispatch({
          actionType: 'toolbar-editableStories',
          stories: res.body
        });

      });
  }

}

module.exports = ToolbarActions;

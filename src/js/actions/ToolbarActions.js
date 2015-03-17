var AppDispatcher = require('../AppDispatcher');

var ToolbarActions = {

  setFont: function (font) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-font',
      font: font
    });

  },

  setAlignment: function (alignment) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-alignment',
      alignment: alignment
    });

  },

  setLoading: function (bool) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-load',
      isLoading: bool
    });

  },

  setStory: function (obj) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-story',
      story: obj
    });

  }

}

module.exports = ToolbarActions;

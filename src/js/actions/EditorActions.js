var AppDispatcher = require('../AppDispatcher');

var EditorActions = {

  setFont: function (font) {

    AppDispatcher.dispatch({
      actionType: 'editor-font',
      font: font
    });

  }
}

module.exports = EditorActions;

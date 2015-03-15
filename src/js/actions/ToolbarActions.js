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
  }

}

module.exports = ToolbarActions;

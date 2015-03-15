var AppDispatcher = require('../AppDispatcher');

var ToolbarActions = {

  setFont: function (font) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-font',
      font: font
    });

  }
}

module.exports = ToolbarActions;

var request       = require('superagent');
var AppDispatcher = require('../AppDispatcher');

var ToolbarActions = {

  setFont: function (font) {

    AppDispatcher.dispatch({
      actionType: 'toolbar-font',
      font: font
    });

  },

  save: function () {

    AppDispatcher.dispatch({
      actionType: 'toolbar-save'
    });


  }
}

module.exports = ToolbarActions;

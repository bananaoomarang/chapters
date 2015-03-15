var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var _data = {
  font: {
    size: null
  },
  alignment: null
};

var EditorStore = assign({}, EventEmitter.prototype, {

  getFont: function () {
    return _data.font;
  },

  getAlignment: function () {
    return _data.alignment;
  },

  emitChange: function () {
    this.emit('editor-change');
  },

  addChangeListener: function(cb) {
    this.on('editor-change', cb);
  }

});

AppDispatcher.register(function (action) {
  switch(action.actionType) {

    case 'toolbar-font':

      _data.font = action.font;

      EditorStore.emitChange();
      break;

    case 'toolbar-alignment':

      _data.alignment = action.alignment;

      EditorStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = EditorStore;

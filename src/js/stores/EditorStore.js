var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var _data = {
  // Metadata for story
  story: {
    title: 'Untitled',
    author: null,
    wordCount: null
  },

  // Styling
  font: {
    size: null
  },
  alignment: null,

  // Interface state
  isLoading: null
};

var EditorStore = assign({}, EventEmitter.prototype, {

  getStory: function () {
    return _data.story;
  },

  getFont: function () {
    return _data.font;
  },

  getAlignment: function () {
    return _data.alignment;
  },

  getIsLoading: function () {
    return _data.isLoading;
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

    case 'toolbar-load':

      _data.isLoading = action.isLoading;

      EditorStore.emitChange();
      break;

    case 'toolbar-story':

      assign(_data.story, action.story);

      EditorStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = EditorStore;

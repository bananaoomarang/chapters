'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var _data = {
  // Metadata for story being edited
  story: {
    title:     'Untitled',
    author:    null,
    wordCount: null
  },

  // Stories possible to edit
  editableStories: [],

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

  getEditableStories: function () {
    return _data.editableStories;
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

    case 'editor-font':

      _data.font = action.font;

      EditorStore.emitChange();
      break;

    case 'editor-alignment':

      _data.alignment = action.alignment;

      EditorStore.emitChange();
      break;

    case 'editor-load':

      _data.isLoading = action.isLoading;

      EditorStore.emitChange();
      break;

    case 'editor-story':

      assign(_data.story, action.story);

      EditorStore.emitChange();
      break;

    case 'editor-editableStories':

      _data.editableStories = action.stories;

      EditorStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = EditorStore;

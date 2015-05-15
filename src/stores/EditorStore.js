'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var _data = {
  // Metadata for story being edited
  story: {
    id:        '',
    title:     '',
    text:      '',
    author:    null,
    wordCount: null
  },

  // Stories possible to edit
  editableStories: [],

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

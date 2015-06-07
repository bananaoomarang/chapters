'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var _data = {
  loadedUser:   [],
  currentStory: {}
};

var StoryStore = assign({}, EventEmitter.prototype, {

  getUserStories: function () {
    return _data.loadedUser;
  },

  getCurrentStory: function () {
    return _data.currentStory;
  },

  emitChange: function () {
    this.emit('story-change');
  },

  addChangeListener: function(cb) {
    this.on('story-change', cb);
  }

});

AppDispatcher.register(function (action) {
  switch(action.actionType) {

    case 'story-load-user':

      _data.loadedUser = action.stories;

      StoryStore.emitChange();
      break;

    case 'story-current':

      assign(_data.currentStory, action.story);

      StoryStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = StoryStore;

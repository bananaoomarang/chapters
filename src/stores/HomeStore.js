'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var _data = {
  // List of stories in system
  stories: []
};

var HomeStore = assign({}, EventEmitter.prototype, {

  getStories: function () {
    return _data.stories;
  },

  emitChange: function () {
    this.emit('home-change');
  },

  addChangeListener: function(cb) {
    this.on('home-change', cb);
  }

});

AppDispatcher.register(function (action) {
  switch(action.actionType) {

    case 'home-stories':

      _data.stories = action.stories;

      HomeStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = HomeStore;

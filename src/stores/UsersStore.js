'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var _data = {
  users: []
};

var UsersStore = assign({}, EventEmitter.prototype, {

  getUsers: function () {
    return _data.users;
  },

  emitChange: function () {
    this.emit('users-change');
  },

  addChangeListener: function(cb) {
    this.on('users-change', cb);
  }

});

AppDispatcher.register(function (action) {
  switch(action.actionType) {

    case 'users-list':

      _data.users = action.list;

      UsersStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = UsersStore;

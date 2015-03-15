var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var _data = {
  name:  null,
  token: null,
  error: null
};

var Store = assign({}, EventEmitter.prototype, {

  getAll: function () {
    return _data;
  },

  getError: function () {
    return _data.error;
  },

  getUser: function () {
    return _data.name;
  },

  getToken: function () {
    return _data.token;
  },

  emitChange: function () {
    this.emit('session-change');
  },

  addChangeListener: function(cb) {
    this.on('session-change', cb);
  }

});

AppDispatcher.register(function (action) {
  switch(action.actionType) {

    case 'session-invalid':
      _data.error = action.error;

      Store.emitChange();
      break;

    case 'session-open':
      _data.name = action.name;
      _data.token = action.token;

      Store.emitChange();
      break;

    case 'session-close':
      Store.emitChange();
      break;

    default:
      break;
  }
});

module.exports = Store;

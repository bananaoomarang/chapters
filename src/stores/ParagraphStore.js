'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var $             = require('jquery');

var _data = {
  paragraphs: [''],

  // Styling
  font: {
    size: null
  },

  alignment: null
};

var ParagraphStore = assign({}, EventEmitter.prototype, {

  getParagraphs: function () {
    return _data.paragraphs;
  },

  getFont: function () {
    return _data.font;
  },

  getAlignment: function () {
    return _data.alignment;
  },

  emitChange: function () {
    this.emit('paragraph-change');
  },

  addChangeListener: function(cb) {
    this.on('paragraph-change', cb);
  }

});

AppDispatcher.register(function (action) {
  switch(action.actionType) {

    case 'paragraph-paragraphs':

      // No I don't want to pull in Jquery for this either.
      // Could possibly render to hidden DOM element?
      _data.paragraphs = $(action.html).toArray().filter(function (p) {

        if (p.nodeName === '#text') return false;

        return true;

      })
      .map(function (p) {
        return p.innerText;
      });

      ParagraphStore.emitChange();
      break;

    case 'paragraph-font':

      _data.font = action.font;

      ParagraphStore.emitChange();
      break;

    case 'paragraph-alignment':

      _data.alignment = action.alignment;

      ParagraphStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = ParagraphStore;

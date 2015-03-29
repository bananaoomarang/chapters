'use strict';

var AppDispatcher = require('../AppDispatcher');

var ParagraphActions = {

  // Take a guess?
  setFont: function (font) {

    AppDispatcher.dispatch({
      actionType: 'paragraph-font',
      font:       font
    });

  },

  // Set paragraph alignment
  setAlignment: function (alignment) {

    AppDispatcher.dispatch({
      actionType: 'paragraph-alignment',
      alignment:  alignment
    });

  },

  setParagraphs: function(html) {

    AppDispatcher.dispatch({
      actionType: 'paragraph-paragraphs',
      html:       html
    });

  }

};

module.exports = ParagraphActions;

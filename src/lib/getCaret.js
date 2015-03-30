'use strict';

var rangy = require('rangy');

// Uses rangy to get a manipulatable caret object
module.exports = function (element) {

  var currentHTML      = element.innerHTML;
  var range            = rangy.createRange();
  var elementSelection = rangy.getSelection(element);
  var windowSelection  = rangy.getSelection();
  var node             = element.childNodes[0];

  return {
    position:  elementSelection.anchorOffset,
    selection: elementSelection.focusOffset,

    setPosition: function (newPosition) {

      setTimeout( function delayCaretMove () {

        switch(newPosition) {
          case 'start':
            range.setStart(node, 0);

          break;

          case 'end':
            range.setStart(node, currentHTML.length);

          break;

          default:
            range.setStart(node, newPosition);

          break;
        }

        range.collapse(true);

        windowSelection.setSingleRange(range);

      });

    }

  };
};
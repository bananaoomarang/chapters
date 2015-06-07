'use strict';

var rangy = require('rangy');

module.exports = function (/* element */) {

  //var currentHTML = element.innerHTML;
  var selection   = rangy.getSelection();

  return selection;

};

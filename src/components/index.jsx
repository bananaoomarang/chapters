'use strict';

var React       = require('react');
var Router      = require('react-router');
var routes      = require('./routes');

module.exports = function () {

  Router.run(routes, function (Handler) {

    React.render(<Handler />, document.getElementById('react-view'));

  });

};

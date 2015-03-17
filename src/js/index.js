'use strict';

var React        = require('react');
var Router       = require('react-router');
var MainView     = require('./MainView');
var Login        = require('./Login');
var Editor       = require('./Editor');
var SessionStore = require('./stores/SessionStore');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  React.createElement(Route, {handler: MainView}, 
    React.createElement(DefaultRoute, {handler: Login}), 

    React.createElement(Route, {name: "login", handler: Login}), 
    React.createElement(Route, {name: "editor", handler: Editor})
  )
);

Router.run(routes, function (Handler) {

  React.render(React.createElement(Handler, null), document.getElementById('editor'));

});


'use strict';

var React        = require('react');
var Router       = require('react-router');
var MainView     = require('./MainView');
var Login        = require('./Login');
var Register     = require('./Register');
var Editor       = require('./Editor');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  React.createElement(Route, {handler: MainView}, 
    React.createElement(DefaultRoute, {handler: Login}), 

    React.createElement(Route, {name: "login", handler: Login}), 
    React.createElement(Route, {name: "register", handler: Register}), 
    React.createElement(Route, {name: "editor", handler: Editor})
  )
);

Router.run(routes, function (Handler) {

  React.render(React.createElement(Handler, null), document.getElementById('editor'));

});


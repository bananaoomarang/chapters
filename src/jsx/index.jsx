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
  <Route handler={MainView}>
    <DefaultRoute handler={Login} />

    <Route name="login"  handler={Login}  />
    <Route name="editor" handler={Editor} />
  </Route>
);

Router.run(routes, function (Handler) {

  React.render(<Handler />, document.getElementById('editor'));

});


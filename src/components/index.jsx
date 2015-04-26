'use strict';

var React    = require('react');
var Router   = require('react-router');
var MainView = require('./MainView');
var Login    = require('./Login');
var Register = require('./Register');
var Editor   = require('./Editor');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route handler={MainView}>
    <DefaultRoute handler={Login} />

    <Route name="login"     handler={Login}    />
    <Route name="register"  handler={Register} />
    <Route name="editor"    handler={Editor}   />
  </Route>
);

module.exports = function () {

  Router.run(routes, function (Handler) {

    React.render(<Handler />, document.getElementById('editor'));

  });

};

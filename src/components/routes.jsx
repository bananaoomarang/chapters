var React        = require('react');
var Route        = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;

var MainView    = require('./MainView');
var Home        = require('./Home');
var Login       = require('./Login');
var Register    = require('./Register');
var Editor      = require('./Editor');
var Users       = require('./Users');
var UserStories = require('./Users/Stories');

module.exports = (
  <Route handler={MainView}>
    <DefaultRoute handler={Home} />

    <Route name="home"         handler={Home}                                    />
    <Route name="login"        handler={Login}                                   />
    <Route name="register"     handler={Register}                                />
    <Route name="editor"       handler={Editor}                                  />
    <Route name="users"        handler={Users}                                   />
    <Route name="user-stories" handler={UserStories} path="/users/:user/stories" />
  </Route>
);

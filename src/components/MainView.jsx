'use strict';

var React          = require('react');
var Router         = require('react-router');
var SessionStore   = require('../stores/SessionStore');
var SessionActions = require('../actions/SessionActions');

var RouteHandler = Router.RouteHandler;

var MainView = {

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    var storedToken = window.sessionStorage.getItem('token');

    if(storedToken) SessionActions.validate(storedToken);

    return {
      user:       SessionStore.getUser(),
      token:      SessionStore.getToken(),
      loginError: SessionStore.getError()
    };
  },

  onSessionChange: function () {

    var token = SessionStore.getToken();

    if(token) this.context.router.transitionTo('/editor');

    this.setState({
      user:       SessionStore.getUser(),
      token:      token,
      loginError: SessionStore.getError()
    });

  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this.onSessionChange);
  },

  render: function () {

    return (
      <div id="main-view">
        <h1> <a href="#/home">Chapters</a> </h1>

        <hr/>

        <RouteHandler />
      </div>
    );

  }

};

module.exports = React.createClass(MainView);

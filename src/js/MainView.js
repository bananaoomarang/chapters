'use strict';

var React        = require('react');
var Router       = require('react-router');
var Editor       = require('./Editor');
var Login        = require('./Login');
var SessionStore = require('./stores/SessionStore');

var Link         = Router.Link;
var RouteHandler = Router.RouteHandler;

var MainView = {

  mixins: [Router.Navigation],

  getInitialState: function () {
    return {
      user:       null,
      token:      null,
      loginError: null
    }
  },

  onSessionChange: function () {
    var token = SessionStore.getToken();

    if(token) this.transitionTo('/editor');

    // Update window.sessionStorage
    if(token !== this.state.token) window.sessionStorage.setItem('token', token);

    this.setState({
      user: SessionStore.getUser(),
      token: token,
      loginError: SessionStore.getError()
    });

  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this.onSessionChange);

    var sessionToken = window.sessionStorage.getItem('token');

    if (sessionToken) {

      this.transitionTo('/editor');

    } else {

      this.transitionTo('/login');

    }

    this.setState({ token: sessionToken });
  },

  render: function () {

    return (
      React.createElement("div", null, 
        React.createElement(RouteHandler, null)
      )
    );

  }

};

module.exports = React.createClass(MainView);

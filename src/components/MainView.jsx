'use strict';

var React        = require('react');
var Router       = require('react-router');
var SessionStore = require('./stores/SessionStore');

var RouteHandler = Router.RouteHandler;

var MainView = {

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      user:       null,
      token:      null,
      loginError: null
    };
  },

  onSessionChange: function () {
    var token = SessionStore.getToken();

    if(token) this.context.router.transitionTo('/editor');

    // Update window.sessionStorage
    if(token !== this.state.token) window.sessionStorage.setItem('token', token);

    this.setState({
      user:       SessionStore.getUser(),
      token:      token,
      loginError: SessionStore.getError()
    });

  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this.onSessionChange);

    var sessionToken = window.sessionStorage.getItem('token');

    if (sessionToken) {

      this.context.router.transitionTo('/editor');

    } else {

      this.context.router.transitionTo('/login');

    }

    this.setState({ token: sessionToken });
  },

  render: function () {

    return (
      <div>
        <RouteHandler />
      </div>
    );

  }

};

module.exports = React.createClass(MainView);

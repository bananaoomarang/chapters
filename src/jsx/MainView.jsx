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

  componentDidMount: function () {
    SessionStore.addChangeListener(this.onSessionChange);

    var sessionToken = window.sessionStorage.getItem('token');

    if (sessionToken) {

      this.transitionTo('/editor', { token: sessionToken });

    } else {

      this.transitionTo('/login');

    }

    this.setState({ token: sessionToken });
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

  render: function () {

    return (
      <div>
        <RouteHandler />
      </div>
    );

    //if(this.state.token) {
      //return (
        //<div className="mainView">
          //<Editor token={this.state.token} />
        //</div>
      //);
    //} else {
      //return (
        //<div className="mainView">
          //<Login signedIn={this.state.user} error={this.state.loginError} />
        //</div>
      //);
    //}

  }

};

module.exports = React.createClass(MainView);

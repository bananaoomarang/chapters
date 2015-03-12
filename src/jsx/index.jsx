'use strict';

var React        = require('react');
var Editor       = require('./Editor');
var Login        = require('./Login');
var SessionStore = require('./stores/SessionStore');

var BaseView = React.createClass({

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

    this.setState({ token: sessionToken });
  },

  onSessionChange: function () {
    var token = SessionStore.getToken();

    // Update window.sessionStorage
    if(token !== this.state.token) window.sessionStorage.setItem('token', token);

    this.setState({
      user: SessionStore.getUser(),
      token: token,
      loginError: SessionStore.getError()
    });

  },

  render: function () {

    if(this.state.token) {
      return (
        <div className="mainView">
          <Editor token={this.state.token} />
        </div>
      );
    } else {
      return (
        <div className="mainView">
          <Login signedIn={this.state.user} error={this.state.loginError} />
        </div>
      );
    }

  }

});

React.render(
  <BaseView />,
  document.getElementById('editor')
);


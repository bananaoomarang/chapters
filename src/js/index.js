'use strict';

var React        = require('react');
var Editor       = require('./Editor');
var Login        = require('./Login');
var SessionStore = require('./stores/SessionStore');

var BaseView = React.createClass({displayName: "BaseView",

  getInitialState: function () {
    return { 
      user: null,
      token: null
    }
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this.onSessionChange);
  },

  onSessionChange: function () {
    this.setState({
      user: SessionStore.getUser(),
      token: SessionStore.getToken()
    });
  },

  render: function () {
    return (
      React.createElement("div", {className: "mainView"}, 
        React.createElement(Editor, {token: this.state.token}), 
        React.createElement("div", {id: "login"}, 
          React.createElement(Login, {signedIn: this.state.user})
        )
      )
    );
  }

});

React.render(
  React.createElement(BaseView, null),
  document.getElementById('editor')
);


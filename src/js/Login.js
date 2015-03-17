'use strict';

var React          = require('react');
var FormData       = require('react-form-data');
var classSet       = require('classnames');
var Link           = require('react-router').Link;
var SessionStore   = require('./stores/SessionStore');
var SessionActions = require('./actions/SessionActions');

var Login = {
  mixins: [FormData],

  getInitialState: function () {
    return {
      error: ''
    };
  },

  onSessionChange: function () {
    this.setState({ error: SessionStore.getError() })
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this.onSessionChange);
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (this.formData.username && this.formData.password)
      SessionActions.open(this.formData);
    else 
      this.setState({ error: 'Please fill form' })
  },

  render: function () {
    var errClasses = classSet({
      'error-msg': true,
      'invisible': !this.state.error
    });

    return (
      React.createElement("div", {className: "login"}, 
        React.createElement("form", {onChange: this.updateFormData, onSubmit: this.handleSubmit}, 
          React.createElement("input", {type: "text", name: "username", id: "form-username-field", placeholder: "Bill"}), 
          React.createElement("input", {type: "password", name: "password", id: "form-password-field", placeholder: "password"}), 

          React.createElement("input", {type: "submit", name: "user-login", id: "submit-user-form", value: "Go"})
        ), 

        React.createElement("a", {className: errClasses}, this.state.error), 

        React.createElement("br", null), 

        React.createElement(Link, {to: "register"}, "Register")
      )
    );

  }
};

module.exports = React.createClass(Login);

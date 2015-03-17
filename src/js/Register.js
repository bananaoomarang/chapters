'use strict';

var React          = require('react');
var FormData       = require('react-form-data');
var Router         = require('react-router');

var Login = {
  mixins: [FormData, Router.Navigation],

  handleSubmit: function (e) {
    e.preventDefault();

    this.formData;
  },

  render: function () {

    return (
      React.createElement("div", {className: "register"}, 

        React.createElement("form", {onChange: this.updateFormData, onSubmit: this.handleSubmit}, 
          React.createElement("input", {type: "text", name: "username", id: "form-username-field", placeholder: "Bill"}), 
          React.createElement("input", {type: "email", name: "email", id: "form-email-field", placeholder: "eljames@hotmail.com"}), 
          React.createElement("input", {type: "password", name: "password", id: "form-password-field", placeholder: "password"}), 

          React.createElement("input", {type: "submit", name: "submit-user", id: "submit-user-form", value: "Register"})
        ), 

        React.createElement("a", {className: "error-msg"}, this.props.error), 
        React.createElement("br", null)

      )
    );

  }
};

module.exports = React.createClass(Login);

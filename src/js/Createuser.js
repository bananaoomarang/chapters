'use strict';

var React          = require('react');
var FormData       = require('react-form-data');

var Login = {
  mixins: [FormData],

  handleSubmit: function (e) {
    e.preventDefault();
  },

  render: function () {

    // Only render if the user needs to sign in

    if(this.props.signedIn) {

      return null;

    } else {

      return (
        React.createElement("div", {className: "login"}, 
          React.createElement("form", {onChange: this.updateFormData, onSubmit: this.handleSubmit}, 
            React.createElement("input", {type: "text", name: "username", id: "form-username-field", placeholder: "Bill"}), 
            React.createElement("input", {type: "password", name: "password", id: "form-password-field", placeholder: "password"}), 

            React.createElement("input", {type: "submit", name: "user-login", id: "submit-user-form", value: "Go"})
          ), 
          React.createElement("a", {className: "error-msg"}, this.props.error), 
          React.createElement("br", null), 
          React.createElement("a", {href: "/createUser.html"}, "Register")
        )
      );
      
    }
  }
};

module.exports = React.createClass(Login);

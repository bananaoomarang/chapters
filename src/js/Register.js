'use strict';

var React    = require('react');
var FormData = require('react-form-data');
var Router   = require('react-router');
var classSet = require('classnames');
var request  = require('superagent');

function ajaxRegister (data, cb) {
  request
    .post('/user/create')
    .send(data)
    .end(function (err, res) {
      if (err) return cb(res.body.message);

      cb(null, res.text)
    });
}

var Register = {
  mixins: [FormData, Router.Navigation],

  getInitialState: function () {
    return {
      error: ''
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if(this.formData.username &&
       this.formData.email    &&
         this.formData.password) {

      ajaxRegister(this.formData, function (err, cb) {
        if (err) 
          this.setState({ error: err });
        else
         this.transitionTo('login'); 
      }.bind(this));

    } else {
      this.setState({ error: 'Please fill in form' });
    }
  },

  render: function () {
    var errClasses = classSet({
      'error-msg': true,
      'invisible': !this.state.error
    });

    return (
      React.createElement("div", {className: "register"}, 

        React.createElement("form", {onChange: this.updateFormData, onSubmit: this.handleSubmit}, 
          React.createElement("input", {type: "text", name: "username", id: "form-username-field", placeholder: "Bill"}), 
          React.createElement("input", {type: "email", name: "email", id: "form-email-field", placeholder: "eljames@hotmail.com"}), 
          React.createElement("input", {type: "password", name: "password", id: "form-password-field", placeholder: "password"}), 

          React.createElement("input", {type: "submit", name: "submit-user", id: "submit-user-form", value: "Register"})
        ), 

        React.createElement("a", {className: errClasses}, this.state.error)

      )
    );

  }
};

module.exports = React.createClass(Register);

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
      <div className="register">

        <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
          <input type="text"     name="username" id="form-username-field" placeholder="Bill"                />
          <input type="email"    name="email"    id="form-email-field"    placeholder="eljames@hotmail.com" />
          <input type="password" name="password" id="form-password-field" placeholder="password"            />

          <input type="submit" name="submit-user" id="submit-user-form" value="Register" />
        </form>

        <a className="error-msg">{this.props.error}</a>
        <br />

      </div>
    );

  }
};

module.exports = React.createClass(Login);

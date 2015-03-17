'use strict';

var React          = require('react');
var FormData       = require('react-form-data');
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

    SessionActions.open(this.formData);
  },

  render: function () {

    return (
      <div className="login">
        <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
          <input type="text"     name="username" id="form-username-field" placeholder="Bill"     />
          <input type="password" name="password" id="form-password-field" placeholder="password" />

          <input type="submit" name="user-login" id="submit-user-form" value="Go" />
        </form>

        <a className="error-msg">{this.state.error}</a>

        <br />

        <Link to="register">Register</Link>
      </div>
    );

  }
};

module.exports = React.createClass(Login);

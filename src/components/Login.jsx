'use strict';

var React          = require('react');
var classSet       = require('classnames');
var FormDataMixin  = require('react-form-data');
var Link           = require('react-router').Link;
var SessionStore   = require('.././stores/SessionStore');
var SessionActions = require('.././actions/SessionActions');

var Login = {
  mixins: [FormDataMixin],

  getInitialState: function () {
    return {
      error: ''
    };
  },

  onSessionChange: function () {
    this.setState({ error: SessionStore.getError() });
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this.onSessionChange);
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (this.formData.username && this.formData.password)
      SessionActions.open(this.formData);
    else
      this.setState({ error: 'Please fill in form' });
  },

  render: function () {
    var errClasses = classSet({
      'error-msg': true,
      'invisible': !this.state.error
    });

    return (
      <div className="login">
        <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
          <input type="text"     name="username" id="form-username-field" placeholder="Bill"     />
          <input type="password" name="password" id="form-password-field" placeholder="password" />

          <input type="submit" name="user-login" id="submit-user-form" value="Go" />
        </form>

        <a className={errClasses}>{this.state.error}</a>

        <br />

        <Link to="register">Register</Link>
      </div>
    );

  }
};

module.exports = React.createClass(Login);

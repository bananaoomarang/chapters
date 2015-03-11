'use strict';

var React          = require('react');
var FormData       = require('react-form-data');
var please         = require('please-ajax')(window);
var SessionActions = require('./actions/SessionActions');

var Login = {
  mixins: [FormData],

  handleSubmit: function (e) {
    e.preventDefault();

    SessionActions.open(this.formData);
  },

  render: function () {

    // Only render if the user needs to sign in

    if(this.props.signedIn) {

      return null;

    } else {

      return (
        <div className="login">
          <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
            <input type="text"     name="username" id="form-username-field" placeholder="Bill" />
            <input type="password" name="password" id="form-password-field" placeholder="password" />

            <input type="submit" name="user-login" id="submit-user-form" value="Go" />
          </form>
        </div>
      );
      
    }
  }
};

module.exports = React.createClass(Login);


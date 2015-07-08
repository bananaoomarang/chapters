'use strict';

import React          from 'react';
import classSet       from 'classnames';
import FormDataMixin  from 'react-form-data';
import { Link }       from 'react-router';
import MagicState     from 'alt/mixins/ReactStateMagicMixin';
import SessionActions from '../actions/SessionActions';

var Login = {
  contextTypes: {
    flux: React.PropTypes.object.isRequired
  },

  mixins: [MagicState, FormDataMixin],

  statics: {
      registerStore: this.context
        .flux
        .getStore('session')
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (this.formData.username && this.formData.password) {
      SessionActions.open(this.formData);
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

export default React.createClass(Login);

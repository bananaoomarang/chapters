'use strict';

import React          from 'react';
import classSet       from 'classnames';
import { Link }       from 'react-router';
import SessionActions from 'actions/SessionActions';

export default class Login extends React.Component {
  contextTypes: {
    flux: React.PropTypes.object.isRequired
  }

  handleFormChange = (e) => {
    console.log('form');
    console.log(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.form.username && this.state.form.password) {
      SessionActions.open(this.state.form);
    } else {
      this.setState({ error: 'Please fill in form' });
    }
  }

  render() {
    var errClasses = classSet({
      'error-msg': true,
      'invisible': !this.state.error
    });

    return (
      <div className="login">
        <form onChange={this.handleFormChange} onSubmit={this.handleSubmit}>
          <input type="text"     name="username" id="form-username-field" value={form.username} placeholder="Bill"     />
          <input type="password" name="password" id="form-password-field" value={form.password} placeholder="password" />

          <input type="submit" name="user-login" id="submit-user-form" value="Go" />
        </form>

        <a className={errClasses}>{error}</a>

        <br />

        <Link to="register">Register</Link>
      </div>
    );
  }
}

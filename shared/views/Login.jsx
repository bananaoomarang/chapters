'use strict';

import React               from 'react';
import { PropTypes }       from 'react';
import classSet            from 'classnames';
import { Link }            from 'react-router';
import { connect }         from 'react-redux';
import * as SessionActions from 'actions/SessionActions';

@connect(state => ({
  error: state.session.get('error'),
  legit: state.session.get('legit')
}))

export default class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error:    PropTypes.string,
    legit:    PropTypes.bool.isRequired
  }

  onFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch(SessionActions.open(this.state));
    } else {
      this.setState({ error: 'Please fill in form' });
    }
  }

  componentDidUpdate = () => {
    if(this.props.legit)
      this.context.router.transitionTo('/home');
  }

  render() {
    const errClasses = classSet({
      'error-msg': true,
      'invisible': !this.props.error
    });

    return (
      <div className="login">
        <form onChange={this.onFormChange} onSubmit={this.onSubmit}>
          <input type="text"     name="username" id="form-username-field" placeholder="Bill"     />
          <input type="password" name="password" id="form-password-field" placeholder="password" />

          <input type="submit" name="user-login" id="submit-user-form" value="Go" />
        </form>

        <a className={errClasses}>{this.props.error}</a>

        <br />

        <Link to="register">Register</Link>
      </div>
    );
  }
}

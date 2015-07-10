import React             from 'react';
import classSet          from 'classnames';
import * as UsersActions from 'actions/UsersActions';
import { connect }       from 'redux/react';

@connect(state => ({
  error:   state.users.get('regError'),
  success: !!state.users.get('regSuccess')
}))

export default class Register extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  static propTypes = {
    error:   React.PropTypes.string,
    success: React.PropTypes.bool.isRequired
  }

  state = {
    error: ''
  }

  onChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if(this.state.form.username &&
       this.state.form.email    &&
         this.state.form.password) {

      UsersActions.registerUser(this.state.form)(this.props.dispatch);

    } else {
      this.setState({ error: 'Please fill in form' });
    }
  }

  render() {
    var errClasses = classSet({
      'error-msg': true,
      'invisible': !(this.props.error || this.state.error)
    });

    if(this.props.success)
      this.context.router.transitionTo('login');

    return (
      <div className="register">

        <form onChange={this.onChange} onSubmit={this.onSubmit}>
          <input type="text"     name="username" id="form-username-field" placeholder="Bill"                />
          <input type="email"    name="email"    id="form-email-field"    placeholder="eljames@hotmail.com" />
          <input type="password" name="password" id="form-password-field" placeholder="password"            />

          <input type="submit" name="submit-user" id="submit-user-form" value="Register" />
        </form>

        <a className={errClasses}>{this.props.error}</a>

      </div>
    );

  }
}


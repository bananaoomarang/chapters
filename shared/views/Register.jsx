import React         from 'react';
import classSet      from 'classnames';
import request       from 'axios';

function ajaxRegister (data, cb) {
  const opts = {
    data
  };

  request
    .post('/users/create', opts)
    .then( (res) => {
      cb(null, res.text);
    })
    .catch( (res) => {
      cb(res.body.message);
    });
}

var Register = {
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return {
      error: ''
    };
  },

  handleSubmit (e) {
    e.preventDefault();

    if(this.formData.username &&
       this.formData.email    &&
       this.formData.password) {

      ajaxRegister(this.formData, function (err) {
        if (err)
          this.setState({ error: err });
        else
          this.context.router.transitionTo('login');
      }.bind(this));

    } else {
      this.setState({ error: 'Please fill in form' });
    }
  },

  render () {
    var errClasses = classSet({
      'error-msg': true,
      'invisible': !this.state.error
    });

    return (
      <div className="register">

        <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
          <input type="text"     name="username" id="form-username-field" placeholder="Bill"                />
          <input type="email"    name="email"    id="form-email-field"    placeholder="eljames@hotmail.com" />
          <input type="password" name="password" id="form-password-field" placeholder="password"            />

          <input type="submit" name="submit-user" id="submit-user-form" value="Register" />
        </form>

        <a className={errClasses}>{this.state.error}</a>

      </div>
    );

  }
};

module.exports = React.createClass(Register);

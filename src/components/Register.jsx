'use strict';

var React         = require('react');
var FormDataMixin = require('react-form-data');
var Router        = require('react-router');
var classSet      = require('classnames');
var request       = require('superagent');

function ajaxRegister (data, cb) {
  request
    .post('/user/create')
    .send(data)
    .end(function (err, res) {
      if (err) return cb(res.body.message);

      cb(null, res.text);
    });
}

var Register = {
  mixins: [FormDataMixin, Router.Navigation],

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

      ajaxRegister(this.formData, function (err) {
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

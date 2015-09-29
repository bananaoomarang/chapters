'use strict';

import React               from 'react';
import { PropTypes }       from 'react';
import { connect }         from 'react-redux';
import * as SessionActions from 'actions/SessionActions';
import Form                from 'components/Form';

@connect(state => ({
  error: state.session.get('error')
}))

export default class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history:  PropTypes.object.isRequired,
    error:    PropTypes.string,
    legit:    PropTypes.bool
  }

  render() {
    const cfg = {
      id:            'login-form',
      submitText:    'Login',
      actionCreator: SessionActions.open,
      error:         this.props.error,

      fields: [
        {
          name:        'username',
          placeholder: 'Username'
        },
        {
          name:        'password',
          type:        'password',
          placeholder: 'Password'
        }
      ],

      didDispatch: success => {
        if(success)
          this.props.history.pushState(null, '/me');
      }
    };

    return (
      <Form {...this.props} {...cfg} />
    );
  }
}

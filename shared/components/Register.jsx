import React, { PropTypes} from 'react';
import * as UsersActions   from 'actions/UsersActions';
import { connect }         from 'react-redux';
import Form                from 'components/Form';

@connect(state => ({
  error: state.users.get('regError')
}))

export default class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history:  PropTypes.object.isRequired,
    error:    PropTypes.string
  }

  render() {
    const cfg = {
      id:            'register-form',
      submitText:    'Register',
      actionCreator: UsersActions.registerUser,
      error:         this.props.error,

      fields: [
        {
          name:        'username',
          placeholder: 'eezy'
        },
        {
          name:        'email',
          type:        'email',
          placeholder: 'eljames@hotmail.com'
        },
        {
          name:        'password',
          type:        'password',
          placeholder: 'Password'
        },
        {
          name:        'password2',
          type:        'password',
          placeholder: 'Confirm password',
          dispatch:     false
        }
      ],

      checks: {
        password2: {
          check: fields => ((fields.password) && (fields.password === fields.password2)),
          error: 'Password fields do not match'
        }
      },

      didDispatch: success => {
        if(success)
          this.props.history.pushState(null, '/home');
      }
    };

    return (
      <Form {...cfg} />
    );
  }
}


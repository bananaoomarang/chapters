import React, { PropTypes} from 'react';
import * as UsersActions   from 'actions/UsersActions';
import { connect }         from 'react-redux';
import Form                from 'components/Form';

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error:    PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
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
        if(success) {
          this.context.router.push('/login');
        }
      }
    };

    return (
      <Form {...cfg} />
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.users.get('regError')
  }
};

export default connect(mapStateToProps)(Register);

import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import * as UsersActions    from 'actions/UsersActions';
import capitalize           from 'lib/capitalize';
import CardsView            from 'components/CardsView';

class UsersList {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users:    PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.dispatch(UsersActions.getUsers())
  }

  render() {
    const users = this.props.users
      .toJS()
      .map(user => ({
        title: capitalize(user.id),
        body:  'Lorem ipsum',
        href:  '/users/' + user.id
      }));

    return <CardsView items={users} emptyMsg="No users :'(" />;
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.get('users')
  }
};

export default connect(mapStateToProps)(UsersList);

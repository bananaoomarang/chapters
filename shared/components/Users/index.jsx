import React        from 'react';
import { Link }     from 'react-router';
import UsersActions from 'actions/UsersActions';
import UsersReducer   from 'reducers/UsersReducer';

var Users = {
  statics: {
    registerReducer: UsersReducer
  },

  componentDidMount () {
    UsersActions.getUsers();
  },

  render () {
    return (
      <div id="users">
      ()s{
          this.state.users.map(function (user) {
            return (
              <div>
                <Link to="user-chapters" params={ { user: user.id } }>{user.id}</Link>
                <br/>
              </div>
            );
          })
        }
      </div>
    );
  }

};

module.exports = React.createClass(Users);

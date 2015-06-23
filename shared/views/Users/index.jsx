import React        from 'react';
import { Link }     from 'react-router';
import MagicState   from 'alt/mixins/ReactStateMagicMixin';
import UsersActions from '../../actions/UsersActions';
import UsersStore   from '../../stores/UsersStore';

var Users = {
  displayName: 'Users',

  mixins: [MagicState],

  statics: {
    registerStore: UsersStore
  },

  componentDidMount: function () {
    UsersActions.getUsers();
  },

  render: function () {
    return (
      <div id="users">
        {
          this.state.users.map(function (user) {
            return (
              <div>
                <Link to="user-stories" params={ { user: user.id } }>{user.id}</Link>
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

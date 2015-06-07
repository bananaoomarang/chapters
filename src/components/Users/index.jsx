'use strict';

var React        = require('react');
var Link         = require('react-router').Link;
var UsersActions = require('../../actions/UsersActions');
var UsersStore   = require('../../stores/UsersStore');

var Users = {
  displayName: 'Users',

  getInitialState: function () {
    return {
      users: UsersStore.getUsers()
    };
  },

  onUsersChange: function () {
    this.setState({
      users: UsersStore.getUsers()
    });
  },

  componentDidMount: function () {
    UsersStore.addChangeListener(this.onUsersChange);

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

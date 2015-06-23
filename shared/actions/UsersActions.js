import request from 'axios';
import alt     from '../alt';

class UsersActions {

  getUsers() {
    request
      .get('/users')
      .then( (res) => {
        this.dispatch(res.body);
      })
      .catch(console.error);
  }
}

module.exports = alt.createActions(UsersActions);

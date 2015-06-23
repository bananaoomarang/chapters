import alt          from '../alt';
import UsersActions from '../actions/UsersActions';

class UsersStore {
  constructor() {
    this.users = [];

    this.bindListeners({
      loadUsers: UsersActions.GET_USERS
    });
  }

  loadUsers(list) {
    this.users = list;
  }
}

export default alt.createStore(UsersStore);

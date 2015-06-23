import alt            from '../alt';
import SessionActions from '../actions/SessionActions';

class SessionStore {
  constructor() {
    this.name  = null;
    this.token = null;
    this.error = null;

    this.bindListeners({
      handleError: SessionActions.CLOSE,
      handleOpen:  SessionActions.OPEN
    });
  }

  handleError(err) {
    this.error = err;
  }

  handleOpen(user) {
    this.name  = user.name;
    this.token = user.token;

    // Update window.sessionStorage
    window.sessionStorage.setItem('token', this.token);
  }
}

export default alt.createStore(SessionStore);

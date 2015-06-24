import alt            from '../alt';
import SessionActions from '../actions/SessionActions';

class SessionStore {
  constructor() {
    this.name  = null;
    this.token = null;
    this.error = null;
    this.legit = false;

    this.bindListeners({
      handleError:     SessionActions.CLOSE,
      handleOpen:      SessionActions.OPEN,
      handleValidated: SessionActions.VALIDATE
    });
  }

  handleError(err) {
    this.legit = false;
    this.error = err;
  }

  handleOpen(user) {
    this.name  = user.name;
    this.token = user.token;
    this.legit = true;

    // Update window.sessionStorage
    window.sessionStorage.setItem('token', this.token);
  }

  handleValidated(username) {
    this.name = username;
    this.legit = true;
  }
}

export default alt.createStore(SessionStore);

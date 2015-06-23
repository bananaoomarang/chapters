import request from 'axios';
import alt     from '../alt';

class SessionActions {

  open(credentials) {
    const opts = {
      data: credentials
    };

    request
      .post('/users/login', opts)
      .then( (res) => {
        this.dispatch({
          name:  credentials.username,
          token: res.text
        });
      })
      .catch(this.actions.close);
  }

  close(err) {
    this.dispatch(err);
  }

  // Check token is still legit
  validate(token) {
    const opts = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    };

    request
      .get('/users/validate', opts)
      .then(this.actions.open)
      .catch(this.actions.close);
  }
}

export default alt.createActions(SessionActions);

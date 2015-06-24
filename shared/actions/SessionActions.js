import request from 'axios';
import alt     from '../alt';

class SessionActions {

  open(credentials) {
    request
      .post('/users/login', credentials)
      .then( ({ data }) => {
        this.dispatch({
          name:  credentials.username,
          token: data
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
      .then( ( { data } ) => this.dispatch(data))
      .catch(this.actions.close);
  }
}

export default alt.createActions(SessionActions);

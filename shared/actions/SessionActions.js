import request from 'axios';
import { OPEN_SESSION,
         CLOSE_SESSION,
         VALIDATE_SESSION } from 'consts/Actions';


export function close(error) {
  return {
    type: CLOSE_SESSION,
    error
  };
}

export function open(credentials) {
  return dispatch => {

    request
      .post('/users/login', credentials)
      .then( ({ data }) => {
        dispatch({
          type:  OPEN_SESSION,
          name:  credentials.username,
          token: data
        });
      })
      .catch(err => close(err));
  };
}

export function validate(token) {
  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  return dispatch => {
    request
      .get('/users/validate', opts)
      .then( ( { data } ) => dispatch({ type: VALIDATE_SESSION, data }))
      .catch(this.actions.close);
  };
}

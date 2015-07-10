import request from 'axios';
import { GET_USERS,
         REGISTRATION_SUCCESS,
         REGISTRATION_ERROR } from 'consts/Actions';

export function getUsers() {
  return dispatch => {
    request
      .get('/users')
      .then(res => dispatch({ type: GET_USERS, ...res.body }))
      .catch(err => console.error(err));
  };
}

export function registrationError(err) {
  return {
    type:  REGISTRATION_ERROR,
    error: err
  };
}

export function registerUser(user) {
  return dispatch => {
    console.log('text: %s');
    request
      .post('/users/create', user)
      .then( ({ text }) => {
        dispatch({
          REGISTRATION_SUCCESS,
          msg: text
        });
      })
      .catch(err => dispatch(
        registrationError(err.data.message)
      ));
  };
}


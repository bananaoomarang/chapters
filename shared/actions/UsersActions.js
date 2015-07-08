import request from 'axios';
import GET_USERS from 'consts/Actions';

export function getUsers() {
  return dispatch => {
    request
    .get('/users')
    .then(res => dispatch({ type: GET_USERS, ...res.body }))
    .catch(err => console.error(err));
  };
}

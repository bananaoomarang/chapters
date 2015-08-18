import request from 'axios';

export function getUsers() {
  return {
    type: 'GET_USERS',
    promise: request.get('/users')
  };
}

export function registerUser(user) {
  return {
    type:    'REGISTER',
    promise: request.post('/users/create', user)
  };
}


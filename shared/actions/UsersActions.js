import request from 'axios';

export function getUsers() {
  return {
    type: 'GET_USERS',
    promise: request.get('/users')
  };
}

export function registrationError(err) {
  return {
    type:  'REGISTRATION_ERROR',
    error: err
  };
}

export function registerUser(user) {
  return {
    type:    'REGISTRATION_SUCCESS',
    promise: request.post('/users/create', user)
  };
}


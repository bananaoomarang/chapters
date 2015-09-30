import request from 'axios';
import path    from 'path';

export function getUsers() {
  return {
    type: 'GET_USERS',
    promise: request.get('/users')
  };
}

export function getUserStories(username) {
  const url = path.join('/users', username, 'stories');

  return {
    type:    'GET_USER_STORIES',
    promise: request.get(url)
  };
}

export function getUserPersonas(username) {
  const url = path.join('/users', username, 'personas');

  return {
    type:    'GET_USER_PERSONAS',
    promise: request.get(url)
  };
}

export function registerUser(user) {
  return {
    type:    'REGISTER',
    promise: request.post('/users/create', user)
  };
}


import request from 'axios';

export function close(error) {
  return {
    type: 'CLOSE_SESSION',
    error
  };
}

export function open(credentials) {
  return {
    type:    'OPEN_SESSION',
    promise: request.post('/users/login', credentials),
    name:    credentials.username
  };
}

export function validate(token) {
  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  return {
    type:    'VALIDATE_SESSION',
    promise: request.get('/users/validate', opts)
  };
}

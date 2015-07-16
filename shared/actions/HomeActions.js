import request from 'axios';

// Load stories
export function getStories() {
  return {
    type:    'GET_HOME_STORIES',
    promise: request.get('/stories')
  };
}

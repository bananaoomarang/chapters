import request from 'axios';
import path    from 'path';

export function postStory (story) {
  return {
    type: 'POST_STORY',
    promise: request.post('/chapters', story)
  };
}

export function getStory (id) {
  return {
    type: 'GET_STORY',
    promise: request.get('/stories/' + id)
  }
}

export function getUserStories(user) {
  const url = path.join('/users', user, 'stories');

  return {
    type:    'GET_USER_STORIES',
    promise: request.get(url)
  };
}


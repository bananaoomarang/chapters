import request      from 'axios';
import ifdefBrowser from 'lib/ifdefBrowser';

export function setStory(story) {
 return {
   type: 'SET_STORY',
   story
 };
}

// Load story by ID
export function getStory(id) {
  const token = ifdefBrowser(() => {
    return window.sessionStorage.getItem('token');
  }) || '';

  let opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  if(!token) delete opts.headers;

  return {
    type: 'GET_STORY',
    promise: request.get('/stories/' + id, opts)
  };
}

// Load a list of possibly editable stories for user
export function getStories() {
  const sessionToken = window.sessionStorage.getItem('token');

  const opts = {
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  return {
    type: 'SET_EDITABLE_STORIES',
    promise: request.get('/users/current/stories', opts)
  };
}

// Upload the story
export function postStory(payload) {
  const sessionToken = window.sessionStorage.getItem('token');

  let opts = {
    method:  'POST',
    url:     '/stories',
    data:    payload,
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  if(payload.id) {
    opts.url += '/' + payload.id;
    opts.method = 'PATCH';
  }

  return {
    type:    'POST_STORY',
    promise: request(opts)
  };
}

export function deleteStory(id) {
  const sessionToken = window.sessionStorage.getItem('token');

  const opts = {
    method: 'DELETE',
    url: '/stories/' + id,
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  return {
    type:    'DELETE_STORY',
    promise: request(opts)
  };
}

export function setLoading(loading) {
  return {
    type: 'SET_LOADING',
    loading
  };
}

export function setEditing(editing) {
  return {
    type: 'SET_EDITING',
    editing
  };
}

export function setAlignment(alignment, index) {
  return {
    type: 'SET_ALIGNMENT',
    index,
    alignment
  };
}

export function setFont(font, index) {
  return {
    type: 'SET_FONT',
    font,
    index
  };
}

export function setFocusedParagraph(index) {
  return {
    type: 'SET_FOCUSED_PARAGRAPH',
    index
  };
}

import request      from 'axios';
import ifdefBrowser from 'lib/ifdefBrowser';

export function setChapter(chapter) {
 return {
   type: 'SET_CHAPTER',
   chapter
 };
}

// Load chapter by ID
export function getChapter(id) {
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
    type: 'GET_CHAPTER',
    promise: request.get('/chapters/' + id, opts)
  };
}

// Load a list of possibly editable chapters for user
export function getStories() {
  const sessionToken = window.sessionStorage.getItem('token');

  const opts = {
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  return {
    type: 'SET_EDITABLE_CHAPTERS',
    promise: request.get('/users/current/chapters', opts)
  };
}

// Upload the chapter
export function postChapter(payload) {
  const sessionToken = window.sessionStorage.getItem('token');

  let opts = {
    method:  'POST',
    url:     '/chapters',
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
    type:    'POST_CHAPTER',
    promise: request(opts)
  };
}

export function deleteChapter(id) {
  const sessionToken = window.sessionStorage.getItem('token');

  const opts = {
    method: 'DELETE',
    url: '/chapters/' + id,
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  return {
    type:    'DELETE_CHAPTER',
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

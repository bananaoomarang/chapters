import request      from 'axios';
import getToken     from 'lib/getToken';
import createSetter from 'lib/createSetter'

export const setChapter          = createSetter('SET_CHAPTER', 'chapter');
export const setFocusedParagraph = createSetter('SET_FOCUSED_PARAGRAPH', 'index');
export const setLoading          = createSetter('SET_LOADING', 'loading');
export const setEditing          = createSetter('SET_EDITING', 'editing');
export const setAlignment        = createSetter('SET_ALIGNMENT', 'alignment', 'index');
export const setFont             = createSetter('SET_FONT', 'font', 'index');

// Load chapter by ID
export function getChapter(id) {
  const token = getToken();

  let opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  return {
    type: 'GET_CHAPTER',
    promise: request.get('/chapters/' + id, opts)
  };
}

// Load a list of possibly editable chapters for user
export function getStories() {
  const token = getToken();

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
  const token = getToken();

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
  const token = getToken();

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

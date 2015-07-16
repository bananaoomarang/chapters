import request                   from 'axios';

export function setStory(story) {
 return {
   type: 'SET_STORY',
   story
 };
}

// Load story by ID
export function getStory(id, token = '') {
  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

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
    method:  'post',
    url:     '',
    data:    payload,
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  // TODO Dodgy API. Should be PATCH/POST
  if(payload.id) {
    opts.url = '/stories/' + payload.id;
  } else {
    opts.url = '/stories/import';
  }

  return {
    type:    'POST_STORY',
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

export function renderParagraphs() {
  return {
    type: 'RENDER_PARAGRAPHS'
  };
}

import request                   from 'axios';
import { SET_STORY,
         SET_EDITABLE_STORIES,
         POST_STORY,
         SET_LOADING,
         SET_EDITING,
         SET_ALIGNMENT,
         SET_FONT,
         SET_FOCUSED_PARAGRAPH } from 'consts/Actions';

export function setStory(story) {
 return {
   type: SET_STORY,
   story
 };
}

export function getStory(id, token = '') {
  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  return dispatch => {
    request
      .get('/stories/' + id, opts)
      .then( ({ data }) => {
        const story = {
          id: data._id,
          ...data
        };

        dispatch(setStory(story));
      })
      .catch(err => console.log(err));
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

  return dispatch => {
    request
      .get('/users/current/stories', opts)
      .then( ({ data }) => dispatch({
        type: SET_EDITABLE_STORIES,
        list: data
      }))
      .catch(err => console.error(err));
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

  if(payload.id) {
    opts.url = '/stories/' + payload.id;
  } else {
    opts.url = '/stories/import';
  }

  return dispatch => {
    request(opts)
      .then( (story) => {

        dispatch({
          type:  POST_STORY,
          story
        });

        console.log('Successfully saved %s', story.title);
      })
      .catch(err => console.error(err));
  };
}

export function setLoading(loading) {
  return { type: SET_LOADING, loading};
}

export function setEditing(editing) {
  return { type: SET_EDITING, editing };
}

export function setAlignment(alignment, index) {
  console.log(index);
  return {
    type: SET_ALIGNMENT,
    index,
    alignment
  };
}

export function setFont(font, index) {
  return {
    type: SET_FONT,
    font,
    index
  };
}

export function setFocusedParagraph(index) {
  return {
    type: SET_FOCUSED_PARAGRAPH,
    index
  };
}

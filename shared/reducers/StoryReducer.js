import { Map, List } from 'immutable';
import { GET_STORY,
         GET_EDITABLE_STORIES,
         SET_LOADING,
         SET_EDITING } from 'consts/Actions';

const defaultState = new Map({
  // Metadata for story being edited
  story: new Map({
    id:        null,
    title:     '',
    text:      '',
    author:    null,
    wordCount: null
  }),

  // Stories it is possible to edit with current permissions
  userStories: new List(),

  // Interface state
  loading: false,

  editing: false
});

export default function storyReducer(state = defaultState, action) {
  switch(action.type) {
    case GET_STORY:
      return state.mergeIn('story', action.story);

    case GET_EDITABLE_STORIES:
      return state.set('editableStories', new List(action.list));

    case SET_LOADING:
      return state.set('loading', action.loading);

    case SET_EDITING:
      return state.set('editing', action.editing);

    default:
      return state;
  }
}

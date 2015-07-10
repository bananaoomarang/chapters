import { Map }        from 'immutable';
import { SET_STORY,
         SET_EDITABLE_STORIES,
         SET_LOADING,
         SET_EDITING } from 'consts/Actions';

const defaultState = new Map({
  story: {
    id:         '',
    title:      '',
    text:       '',
    html:       '',
    author:     '',
    wordCount:  '',
    paragraphs: []
  },

  // Stories it is possible to edit with current permissions
  userStories: [],

  // Interface state
  loading: false,

  editing: false
});

export default function storyReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_STORY:
      return state.mergeDeep({ story: action.story });

    case SET_EDITABLE_STORIES:
      return state.set('editableStories', action.list);

    case SET_LOADING:
      return state.set('loading', action.loading);

    case SET_EDITING:
      return state.set('editing', action.editing);

    default:
      return state;
  }
}

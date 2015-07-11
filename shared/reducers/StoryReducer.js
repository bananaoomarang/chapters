import { Map, List }   from 'immutable';
import ifdefBrowser          from 'lib/ifdefBrowser';
import { SET_STORY,
         SET_EDITABLE_STORIES,
         SET_LOADING,
         SET_EDITING } from 'consts/Actions';

const $ = ifdefBrowser( () => {
  return require('jquery');
});

const defaultState = new Map({
  story: new Map({
    id:         '',
    title:      '',
    text:       '',
    html:       '',
    author:     '',
    wordCount:  '',
    paragraphs: new List()
  }),

  // Stories it is possible to edit with current permissions
  userStories: new List(),

  // Interface state
  loading: false,

  editing: false
});

export default function storyReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_STORY:
      let paragraphs;
      // TODO Just spent about three hours trying to do something cleverer. No dice.
      if($) {
        paragraphs =
          $(action.story.html)
             .toArray()
             .filter(p => p.nodeName !== '#text')
             .map(p => ({
               text: p.textContent,
               font: {
                 size: 24
               },
               alignment: 'left'
             }))
      }

      return state
        .mergeDeep({ story: action.story })
        .setIn(['story', 'paragraphs'], paragraphs);

    case SET_EDITABLE_STORIES:
      return state.set('editableStories', new List(action.list));

    case SET_LOADING:
      return state.set('loading', action.loading);

    case SET_EDITING:
      return state.set('editing', action.editing);

    default:
      return state;
  }
}

import { immutify }    from 'lib/immutify';
import { Map, List }   from 'immutable';
import ifdefBrowser    from 'lib/ifdefBrowser';
import { SET_STORY,
         SET_EDITABLE_STORIES,
         SET_LOADING,
         SET_EDITING,
         SET_ALIGNMENT,
         SET_FONT,
         SET_FOCUSED_PARAGRAPH } from 'consts/Actions';

const $ = ifdefBrowser( () => {
  return require('jquery');
});

const defaultState = immutify({
  story: {
    id:               '',  // Database ID
    title:            '',
    text:             '',  // Markdown
    html:             '',  // HTML from ^
    author:           '',
    wordCount:        0,   // Not currently implemented
    paragraphs:       [],  // Array of objects holding textContent, alignment, font size etc etc
    focusedParagraph: -1   // Index of focused paragraph, -1 for 'nothing focused'
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
      let paragraphs;
      // TODO Just spent about three hours trying to do something cleverer. No dice.
      if($ && state.getIn(['story', 'html']) !== action.story.html) {
        paragraphs =
          $(action.story.html)
             .toArray()
             .filter(p => p.nodeName !== '#text')
             .map(p => Map({
               text: p.textContent,
               font: {
                 size: 24
               },
               alignment: 'left'
             }));
      }

      return state
        .mergeDeep({ story: action.story })
        .setIn(['story', 'paragraphs'], List(paragraphs));

    case SET_EDITABLE_STORIES:
      return state.set('editableStories', List(action.list));

    case SET_LOADING:
      return state.set('loading', action.loading);

    case SET_EDITING:
      return state.set('editing', action.editing);

    case SET_FOCUSED_PARAGRAPH:
      return state.setIn(['story', 'focusedParagraph'], Number(action.index));

    case SET_FONT:
      return state.mergeIn(['story', 'paragraphs', action.index], { font: action.font });

    case SET_ALIGNMENT:
      return state.setIn(['story', 'paragraphs', action.index, 'alignment'], action.alignment);

    default:
      return state;
  }
}

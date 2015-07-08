import { Map, List }      from 'immutable';
import $                  from 'jquery';
import { SET_FONT,
         SET_ALIGNMENT,
         SET_PARAGRAPHS } from 'consts/Actions';

const defaultState = new Map({
  paragraphs: new List(''),

  // Styling
  font: new Map({
    size: null
  }),

  alignment: null
});

 export default function paragraphReducer(state = defaultState, action) {
   switch(action.type) {
     case SET_PARAGRAPHS:
      // No I don't want to pull in Jquery for this either.
      // Could possibly render to hidden DOM element?

      const paragraphs = $(action.html)
        .toArray()
        .filter(p => p.nodeName !== '#text')
        .map(p => p.textContent);

       return state.set('paragraphs', new List(paragraphs));

     case SET_FONT:
       return state.set('font', action.font);

     case SET_ALIGNMENT:
       return state.set('alignment', action.alignment);

     default:
       return state;
   }
}

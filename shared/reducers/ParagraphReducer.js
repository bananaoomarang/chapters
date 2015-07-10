import { Map }            from 'immutable';
import ifdefBrowser       from 'lib/ifdefBrowser';
import { SET_FONT,
         SET_ALIGNMENT,
         SET_PARAGRAPHS } from 'consts/Actions';

const $ = ifdefBrowser( () => {
  return require('jquery');
});

const defaultState = new Map({
  paragraphs: [''],

  // Styling
  font: {
    size: 24
  },

  alignment: 'center'
});

 export default function paragraphReducer(state = defaultState, action) {
   switch(action.type) {
     case SET_PARAGRAPHS:
      // No I don't want to pull in Jquery for this either.
      // Could possibly render to hidden DOM element?
      let paragraphs = [''];

       if($) {
         paragraphs = $(action.html)
           .toArray()
           .filter(p => p.nodeName !== '#text')
           .map(p => p.textContent);
       }

       return state.set('paragraphs', paragraphs);

     case SET_FONT:
       return state.set('font', action.font);

     case SET_ALIGNMENT:
       return state.set('alignment', action.alignment);

     default:
       return state;
   }
}

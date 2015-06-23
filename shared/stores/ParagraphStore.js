'use strict';

import $                from 'jquery';
import alt              from '../alt';
import ParagraphActions from '../actions/ParagraphActions';

class ParagraphStore {
  constructor() {

    this.paragraphs = [''];

    // Styling
    this.font = {
      size: null
    };

    this.alignment = null;

    this.bindListeners({
      loadParagraphs: ParagraphActions.SET_PARAGRAPHS
    });
  }

  loadParagraphs(html) {
    // No I don't want to pull in Jquery for this either.
    // Could possibly render to hidden DOM element?
    this.paragraphs = $(html)
      .toArray()
      .filter(function (p) {
        if (p.nodeName === '#text')
          return false;
        else
          return true;

      })
      .map(function (p) {
        return p.innerText;
      });
  }

  loadFont(font) {
   this.font = font;
  }

  loadAlignment(alignment) {
    this.alignment = alignment;
  }
}

export default alt.createStore(ParagraphStore);

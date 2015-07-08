import { SET_FONT, SET_ALIGNMENT, SET_PARAGRAPHS } from 'consts/Actions';

class ParagraphActions {
  constructor() {
    this.generateActions('setFont', 'setAlignment', 'setParagraphs');
  }
}

export function setFont(font) {
  return {
    type: SET_FONT,
    font
  };
}

export function setAlignment(alignment) {
  return {
    type: SET_ALIGNMENT,
    alignment
  };
}

export function setParagraphs(html) {
  return {
    type: SET_PARAGRAPHS,
    html
  };
}

export default ParagraphActions;

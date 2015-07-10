import { SET_FONT, SET_ALIGNMENT, SET_PARAGRAPHS } from 'consts/Actions';

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


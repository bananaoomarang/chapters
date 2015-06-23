import alt from '../alt';

class ParagraphActions {
  // Take a guess?
  setFont(font) {
    this.dispatch(font);
  }

  // Set paragraph alignment
  setAlignment(alignment) {
    this.dispatch(alignment);
  }

  setParagraphs(html) {
    this.dispatch(html);
  }
}

export default alt.createActions(ParagraphActions);

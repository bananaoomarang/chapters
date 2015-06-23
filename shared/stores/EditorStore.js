'use strict';

import assign        from 'object-assign';
import alt           from '../alt';
import EditorActions from '../actions/EditorActions';

class EditorStore {

  constructor() {
    // Metadata for story being edited
    this.story = {
      id:        '',
      title:     '',
      text:      '',
      author:    null,
      wordCount: null
    };

    // Stories possible to edit
    this.editableStories = [];

    // Interface state
    this.isLoading = null;

    this.bindListeners({
      loadingState:        EditorActions.SET_LOADING,
      loadStory:           EditorActions.SET_STORY,
      loadEditableStories: EditorActions.POPULATE_STORIES
    });
  }

  loadingState(bool) {
    this.isLoading = bool;
  }

  loadStory(story) {
    assign(this.story, story);
  }

  loadEditableStories(list) {
    this.editableStories = list;
  }
}

export default alt.createStore(EditorStore);

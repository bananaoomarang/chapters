'use strict';

var React             = require('react');
var Dropzone          = require('dropzone');
var EditorToolbar     = require('./Toolbar');
var EditorTitle       = require('./Title');
var EditorMainView    = require('./MainView');
var StorySelector     = require('./StorySelector');
var EditorStore       = require('../../stores/EditorStore');
var EditorActions     = require('../../actions/EditorActions');
var ParagraphActions  = require('../../actions/ParagraphActions');

var Editor = {

  cfg: {
    defaultFont:      {
      size: 24
    },
    defaultAlignment: 'center'
  },

  getInitialState: function () {
    return {
      story:           EditorStore.getStory(),
      editableStories: EditorStore.getEditableStories(),
      loadDialogue:    EditorStore.getIsLoading()
    };
  },

  onEditorChange: function () {
    this.setState({
      story:           EditorStore.getStory(),
      editableStories: EditorStore.getEditableStories(),
      loadDialogue:    EditorStore.getIsLoading()
    });
  },

  handleSave: function () {

    var payload = {
      title: this.state.story.title,
      text:  this.exportText()
    };

    EditorActions.save(payload);

  },

  // Concatanate html tags into one string for exporting
  exportText: function () {
    var div    = document.getElementById('paragraph-container');
    var string = '';

    if(div.hasChildNodes()) {

      for (var child in div.childNodes) {
        var p    = div.childNodes[child];
        var text = p.innerText;

        if(text) string += text + '\n\n';
        else     string += '\n\n';
      }

    }

    return string;
  },

  componentDidMount: function () {
    var sessionToken = window.sessionStorage.getItem('token');

    EditorStore.addChangeListener(this.onEditorChange);

    var dropzoneOpts = {
      url:     '/story/upload',
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    var dropzone  = new Dropzone('body', dropzoneOpts);

    dropzone.on('sending', function(file, xhr, formData) {
      formData.append('filename', file.name);
    });
  },

  render: function () {

    var storySelectorStyle = {
      visibility: this.state.loadDialogue ? 'visible' : 'hidden',
      opacity:    this.state.loadDialogue ? 1 : 0
    };

    return (
      <div>
        <EditorToolbar handleSave={this.handleSave} />

        <hr />

        <EditorTitle title={this.state.story.title} placeholder="Untitled" />

        <hr />

        <EditorMainView defaultFont={this.cfg.defaultFont} alignment={this.cfg.defaultAlignment} />

        <StorySelector style={storySelectorStyle} storyList={this.state.editableStories} />

        <div className="story-render hidden" dangerouslySetInnerHTML={ {__html: this.state.story.text} }></div>
      </div>
    );
  }
};

module.exports = React.createClass(Editor);

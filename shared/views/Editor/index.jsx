import React         from 'react';
import MagicState    from 'alt/mixins/ReactStateMagicMixin';
import EditorToolbar from './Toolbar';
import EditorTitle   from './Title';
import ParagraphView from './ParagraphView';
import StorySelector from './StorySelector';
import EditorStore   from '../../stores/EditorStore';
import EditorActions from '../../actions/EditorActions';
import runInBrowser  from '../../lib/runInBrowser';

var Dropzone = runInBrowser( () => {
  return require('dropzone');
});

var Editor = {
  displayName: 'Editor',

  mixins: [MagicState],

  statics: {
    registerStore: EditorStore
  },

  cfg: {
    defaultFont: {
      size: 24
    },
    defaultAlignment: 'center'
  },

  handleSave: function () {

    console.log(this.state.story.id);

    var payload = {
      id:    this.state.story.id,
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
    const sessionToken = window.sessionStorage.getItem('token');

    const dropzoneOpts = {
      url:     '/stories/upload',
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    if(Dropzone) {
      let dropzone  = new Dropzone('body', dropzoneOpts);

      dropzone.on('sending', function(file, xhr, formData) {
        formData.append('filename', file.name);
      });
    }

  },

  render: function () {

    var storySelectorStyle = {
      visibility: this.state.isLoading ? 'visible' : 'hidden',
      opacity:    this.state.isLoading ? 1 : 0
    };

    return (
      <div>
        <EditorToolbar handleSave={this.handleSave} defaultFont={this.cfg.defaultFont} />

        <hr />

        <EditorTitle title={this.state.story.title} placeholder="Untitled" />

        <hr />

        <ParagraphView defaultFont={this.cfg.defaultFont} alignment={this.cfg.defaultAlignment} />

        <StorySelector style={storySelectorStyle} storyList={this.state.editableStories} />

        <div className="story-render hidden" dangerouslySetInnerHTML={ {__html: this.state.story.text} }></div>
      </div>
    );
  }
};

module.exports = React.createClass(Editor);

import React         from 'react';
import EditorToolbar from './Toolbar';
import EditorTitle   from './Title';
import ParagraphView from './ParagraphView';
import StorySelector from './StorySelector';
import EditorReducer   from 'reducers/StoryReducer';
import EditorActions from 'actions/StoryActions';
import ifdefBrowser  from 'lib/ifdefBrowser';

var Dropzone = ifdefBrowser( () => {
  return require('dropzone');
});

var Editor = {
  displayName: 'Editor',

  statics: {
    registerReducer: EditorReducer
  },

  cfg: {
    defaultFont: {
      size: 24
    },
    defaultAlignment: 'center'
  },

  handleSave () {

    console.log(this.state.story.id);

    var payload = {
      id:    this.state.story.id,
      title: this.state.story.title,
      text:  this.exportText()
    };

    EditorActions.save(payload);

  },

  // Concatanate html tags into one string for exporting
  exportText () {
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

  componentDidMount () {
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

  render () {

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

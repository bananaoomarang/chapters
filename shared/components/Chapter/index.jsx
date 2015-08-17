import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';
import ChapterTitle         from './Title';
import ChapterToolbar       from './Toolbar';
import ParagraphView        from './ParagraphView';
import * as ChapterActions  from 'actions/ChapterActions';
import ifdefBrowser         from 'lib/ifdefBrowser';
import getToken             from 'lib/getToken'

var Dropzone = ifdefBrowser( () => {
  return require('dropzone');
});

@connect(state => ({
  chapter: state.chapter.get('chapter'),
  editing: state.chapter.get('editing')
}))

export default class Chapter extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    chapter:  PropTypes.object.isRequired,
    editing:  PropTypes.bool.isRequired
  }

  static needs = [
    ChapterActions.getChapter
  ]

  constructor(props) {
    super(props);

    this.cfg = {
      defaultFont: {
        size: 24
      },
      defaultAlignment: 'center'
    };

  }

  componentDidMount = () => {
    const sessionToken = getToken();

    const dropzoneOpts = {
      url:     '/api/chapters/upload',
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    const dropzone  = new Dropzone('#chapter', dropzoneOpts);

    dropzone.on('sending', function(file, xhr, formData) {
      formData.append('filename', file.name);
    });
  }

  handleSave = () => {
    const payload = {
      id:       this.props.chapter.get('id'),
      title:    this.props.chapter.get('title'),
      markdown: this.exportText()
    };

    console.log('payload', payload);

    this.props.dispatch(ChapterActions.postChapter(this.props.routeParams, payload))
      .then(success => {
          if(success) this.props.dispatch(ChapterActions.setEditing(false));
      });
  }

  // Concatanate html tags into one string for exporting
  exportText = () => {
    var div    = document.getElementById('paragraph-container');
    var string = '';

    if(div.hasChildNodes()) {

      for (var child in div.childNodes) {
        var p    = div.childNodes[child];
        var text = p.textContent;

        if(text) string += text + '\n\n';
        else     string += '\n\n';
      }

    }

    return string;
  }

  setEditing = () => {
    this.props.dispatch(ChapterActions.setEditing(true));
  }

  render () {
    const editButtonStyle = {
      display: (!this.props.editing && this.props.chapter.get('write')) ? 'inline-block' : 'none'
    };

    return (
      <div id="chapter">
        <ChapterToolbar handleSave={this.handleSave} defaultFont={this.cfg.defaultFont} />

        <ChapterTitle title={this.props.chapter.get('title')} placeholder="Untitled" />

        <button style={editButtonStyle} onClick={this.setEditing}>Edit</button>

        <hr />

        <h2>
          By&nbsp;
          <Link to="user" params={ { user: this.props.chapter.get('author') } }>{this.props.chapter.get('author')}</Link>
        </h2>

        <br/>

        <ParagraphView defaultFont={this.cfg.defaultFont} alignment={this.cfg.defaultAlignment} paragraphs={this.props.chapter.get('paragraphs')} />
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';
import { List }             from 'immutable';
import ChapterTitle         from './Title';
import ChapterToolbar       from './Toolbar';
import * as ChapterActions  from 'actions/ChapterActions';
import ifdefBrowser         from 'lib/ifdefBrowser';
import getToken             from 'lib/getToken';
import capitalize           from 'lib/capitalize';

var Dropzone = ifdefBrowser( () => {
  return require('dropzone');
});

var MediumEditor = ifdefBrowser( () => {
    require('medium-editor/dist/css/medium-editor.min.css');

    return require('medium-editor');
});

var CheekyKeys = ifdefBrowser( () => require('lib/cheeky-keys'));

@connect(state => ({
  chapter:     state.chapter.get('chapter'),
  editing:     state.chapter.get('editing'),
  currentUser: state.session.get('name')
}))

export default class Chapter extends React.Component {
  static propTypes = {
    dispatch:    PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    chapter:     PropTypes.object.isRequired,
    editing:     PropTypes.bool.isRequired
  }

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
      url:     '/api/' + ['chapters', this.props.routeParams.id].join('/'),
      method:  'put',
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    const dropzone  = new Dropzone('#chapter', dropzoneOpts);

    dropzone.on('sending', function(file, xhr, formData) {
      formData.append('filename', file.name);
    });

    if(this.props.routeParams.id) {
      this.props.dispatch(ChapterActions.getChapter(this.props.routeParams));
    }
    else {
      // This is a new chapter
      this.props.dispatch(ChapterActions.setEditing(true));

      if(!this.props.chapter.get('author'))
        this.props.dispatch(ChapterActions.setChapter({ author: this.props.currentUser }))
    }
  }

  componentWillUpdate = (nextProps) => {
    // Editor options
    const opts = {
      extensions: {
        'cheeky-keys': new CheekyKeys()
      }
    };

    if (nextProps.editing && !this.props.editing) {
      this.editor ? this.editor.setup() : (this.editor = new MediumEditor('#chapter-body', opts));
    }
    else if (!nextProps.editing && this.props.editing) {
      this.editor.destroy();
    }
  }

  componentWillUnmount = () => {
      this.props.dispatch(ChapterActions.setEditing(false));
  }

  handleSave = () => {
    const payload = {
      title:    this.props.chapter.get('title'),
      author:   this.props.chapter.get('author'),
      markdown: this.exportText()
    };

    let promise = this.props.routeParams.id ?
      this.props.dispatch(ChapterActions.patchChapter(this.props.routeParams, payload)) 
        :
      this.props.dispatch(ChapterActions.postChapter(payload));

    return promise
        .then(success => {
            if(success) this.props.dispatch(ChapterActions.setEditing(false));
        });
  }

  exportText = () => {
    // Might be easier just to traverse the tree?
    const html      = this.editor.serialize()['chapter-body'].value;
    const splitPeas = html.split('</p>');

    // Yeah I'm going all the way with this. This is what wine does.
    const peas = splitPeas
      .map(p => p.replace('<p>', ''));

    return peas.join('\n\n');
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
          <Link to={`/users/${this.props.chapter.get('author')}`}>{capitalize(this.props.chapter.get('author'))}</Link>
        </h2>

        <div id="chapter-body" dangerouslySetInnerHTML={{__html: this.props.chapter.get('html')}}>
        </div>

        <br/>
      </div>
    );
  }
}

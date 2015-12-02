import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { List }             from 'immutable';
import EditableHeader       from './EditableHeader';
import ChapterToolbar       from './Toolbar';
import * as ChapterActions  from 'actions/ChapterActions';
import ifdefBrowser         from 'lib/ifdefBrowser';
import getToken             from 'lib/getToken';

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

  static contextTypes = {
    history: PropTypes.object.isRequired
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
      placeholder: {
        text: 'Type something, please'
      },
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
      this.props.dispatch(ChapterActions.flushChapter());
      this.props.dispatch(ChapterActions.setEditing(false));
  }

  deployChapter = (payload) => {
    return this.props.routeParams.id ?
      this.props.dispatch(ChapterActions.patchChapter(this.props.routeParams, payload)) 
        :
      this.props.dispatch(ChapterActions.postChapter(payload));
  }

  exportText = () => {
    const html      = this.refs['chapter-body'].innerHTML;
    const splitPeas = html.split('</p>');

    console.log(html);

    // Yeah I'm going all the way with this. This is what wine does.
    const peas = splitPeas
      .map(p => p.replace('<p>', ''));

    return peas.join('\n\n');
  }

  handleSave = () => {
    const payload = {
      title:    this.props.chapter.get('title'),
      author:   this.props.chapter.get('author'),
      markdown: this.exportText()
    };

    const promise = this.deployChapter(payload);

    return promise
        .then(success => {
            if(success) this.props.dispatch(ChapterActions.setEditing(false));
        });
  }

  handleDelete = () => {
    this.props.dispatch(ChapterActions.deleteChapter(this.props.id))
      .then(() => this.context.history.pushState(null, '/home'));
  }

  handlePublish = () => {
    const payload = {
      title:    this.props.chapter.get('title'),
      author:   this.props.chapter.get('author'),
      markdown: this.exportText(),
      public:   true
    };

    const promise = this.deployChapter(payload);

    return promise
      .then(success => {
        if(success) this.props.dispatch(ChapterActions.setEditing(false));
      });
  }

  setEditing = () => {
    this.props.dispatch(ChapterActions.setEditing(true));
  }

  render () {
    const titleStyle = {
      display: 'inline'
    };

    const authorStyle = {
      display: 'inline'
    };

    return (
      <div id="chapter">
        <div id="chapter-title">
          <EditableHeader
            style={titleStyle}
            header={this.props.chapter.get('title')}
            placeholder="Untitled"
            editing={this.props.editing}
            update={(t) => { this.props.dispatch(ChapterActions.setChapter({ title: t })) }} />

          <ChapterToolbar
            defaultFont={this.cfg.defaultFont}
            id={this.props.chapter.get('id')}
            editing={this.props.editing} 
            display={this.props.chapter.get('write') || !this.props.routeParams.id}
            setEditing={this.setEditing} 
            save={this.handleSave} 
            del={this.handleDelete}
            publish={this.handlePublish} />
          <hr />
        </div>

        <div id="chapter-author">
          <h1 style={authorStyle}>By&nbsp;</h1>

          <EditableHeader
            style={authorStyle}
            header={this.props.chapter.get('author')}
            prefix="By&nbsp;"
            placeholder="Unauthored"
            editing={this.props.editing}
            update={(a) => { this.props.dispatch(ChapterActions.setChapter({ author: a })) }} />
          <hr />
        </div>


        <div id="chapter-body" ref="chapter-body" dangerouslySetInnerHTML={{__html: this.props.chapter.get('html')}}>
        </div>

        <br/>
      </div>
    );
  }
}

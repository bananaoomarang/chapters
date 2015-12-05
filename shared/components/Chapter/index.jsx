import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import EditableHeader       from './EditableHeader';
import ChapterToolbar       from './Toolbar';
import ListView             from 'components/ListView';
import CardsView            from 'components/CardsView';
import Collapsable          from 'components/Collapsable';
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
    route:       PropTypes.object.isRequired,
    location:    PropTypes.object.isRequired,
    routeParams: PropTypes.object.isRequired,
    chapter:     PropTypes.object.isRequired,
    editing:     PropTypes.bool.isRequired,
    currentUser: PropTypes.string.isRequired,
  }

  static contextTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    bodyCollapsed: false
  };

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
      url:     '/api/chapters' + (this.props.routeParams.id ? ('/' + this.props.routeParams.id) : ''),
      method:  'put',
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    const dropzone  = new Dropzone('#chapter-body', dropzoneOpts);

    dropzone.on('sending', function(file, xhr, formData) {
      formData.append('filename', file.name);
    });

    const isNew = /^new/.test(this.props.route.name);

    if(isNew) {
      this.props.dispatch(ChapterActions.setEditing(true));

      if(!this.props.chapter.get('author'))
        this.props.dispatch(ChapterActions.setChapter({ author: this.props.currentUser }))
    }
    else if(this.props.routeParams.id) {
      return this.props.dispatch(ChapterActions.getChapter(this.props.routeParams.id));
    }
  }

  componentWillUpdate = (nextProps) => {
    // Setup editor options
    const editorOpts = {
      placeholder: {
        text: 'Type something, please'
      },
      extensions: {
        'cheeky-keys': new CheekyKeys()
      }
    };

    if (nextProps.editing && !this.props.editing) {
      this.editor ? this.editor.setup() : (this.editor = new MediumEditor('#chapter-body', editorOpts));
    }
    else if (!nextProps.editing && this.props.editing) {
      this.editor.destroy();
    }

    const isNewID = (nextProps.routeParams.id !== this.props.routeParams.id);
    const isNew   = (/^new/.test(nextProps.route.name) && !/^new/.test(this.props.route.name));

    if (isNewID) {
      this.flushChapter();
      this.props.dispatch(ChapterActions.getChapter(nextProps.routeParams.id));
    }

    if (isNew)
      this.flushChapter();
  }

  componentWillUnmount = () => {
    this.flushChapter();
    this.props.dispatch(ChapterActions.setEditing(false));
  }

  flushChapter = () => {
    this.props.dispatch(ChapterActions.flushChapter());
  }

  deployChapter = (payload) => {
    const { route, routeParams, dispatch } = this.props;

    switch(route.name) {
      case 'chapter':
        return dispatch(ChapterActions.patchChapter(routeParams.id, payload));

      case 'new-chapter':
        return dispatch(ChapterActions.postChapter(payload));

      case 'new-subchapter':
        return dispatch(ChapterActions.postChapter(payload, routeParams.id));

      default:
        return console.error("Can't figure out how to deploy chapter");
    }
  }

  exportText = () => {
    const html      = this.refs['chapter-body'].innerHTML;
    const splitPeas = html.split('</p>');

    // Yeah I'm going all the way with this. This is what wine does.
    const peas = splitPeas
      .map(p => p.replace('<p>', ''));

    return peas.join('\n\n');
  }

  handleSave = () => {
    const { query } = this.props.location;

    const payload = {
      title:    this.props.chapter.get('title'),
      author:   this.props.chapter.get('author'),
      markdown: this.exportText(),
      ordered:  !!(+query.ordered)
    };

    const promise = this.deployChapter(payload);

    return promise
        .then(success => {
            if(success) this.props.dispatch(ChapterActions.setEditing(false));
        });
  }

  handleDelete = () => {
    this.props.dispatch(ChapterActions.deleteChapter(this.props.routeParams.id))
      .then(() => this.context.history.pushState(null, '/home'));
  }

  handlePublish = (bool) => {
    const { query } = this.props.location;

    const payload = {
      title:    this.props.chapter.get('title'),
      author:   this.props.chapter.get('author'),
      markdown: this.exportText(),
      ordered:  !!(+query.ordered),
      public:   (bool || bool === false) ? bool : true
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
      display: 'inline-block',
      marginBottom: '0px'
    };

    const authorStyle = {
      display: 'inline'
    };

    const subList  = this.props.chapter.get('subOrdered')
      .map(chapter => ({
        title:       chapter.get('title'),
        separator:   '&nbsp;',
        description: chapter.get('description') || '???',
        adendum:     'By ' + capitalize(chapter.get('author')),
        href:        ['/chapters', chapter.get('id')].join('/')
      }));

    const subCards = this.props.chapter.get('subUnordered')
      .map(chapter => ({
        title: chapter.get('title'),
        body:  <em>{chapter.description || '???'}</em>,
        href:  ['/chapters' + chapter.id].join('/')
      }));

    const newChapter = /^new/.test(this.props.route.name);

    const showList  = !(subList.count() ? true  : (this.props.editing || newChapter));
    const showCards = !(subCards.count() ? true : (this.props.editing || newChapter));

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
            display={ newChapter || this.props.chapter.get('write')}
            public={this.props.chapter.get('public')}
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

          <hr onClick={() => this.setState( { bodyCollapsed: !this.state.bodyCollapsed } )}/>
        </div>

        <Collapsable collapsed={this.state.bodyCollapsed}>
          <div id="chapter-body" ref="chapter-body" dangerouslySetInnerHTML={{__html: this.props.chapter.get('html')}}>
          </div>
          <hr />
        </Collapsable>


        <Collapsable collapsed={showList}>
          <div id="chapter-list">
            <ListView
              elements={subList}
              editing={this.props.editing} 
              onReorder={()=>{}}
              handleSave={()=>{}} 
              createUrl={['/chapters', this.props.chapter.get('id'), 'new'].join('/') + '?ordered=1'} />
          </div>
          <hr />
        </Collapsable>

        <Collapsable collapsed={showCards}>
          <div id="chapter-cards">
            <CardsView
              elements={subCards}
              editing={this.props.editing}
              onReorder={()=>{}}
              handleSave={()=>{}}
              createUrl={['/chapters', this.props.chapter.get('id'), 'new'].join('/') + '?ordered=0'} />
          </div>
        </Collapsable>
      </div>
    );
  }
}

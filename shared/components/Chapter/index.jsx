import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import EditableHeader       from './EditableHeader';
import ChapterToolbar       from './Toolbar';
import ChapterBreadcrumbs   from './Breadcrumbs';
import ListView             from 'components/ListView';
import CardsView            from 'components/CardsView';
import Collapsable          from 'components/Collapsable';
import * as ChapterActions  from 'actions/ChapterActions';
import * as SessionActions  from 'actions/SessionActions';
import ifdefBrowser         from 'lib/ifdefBrowser';
import getToken             from 'lib/getToken';
import capitalize           from 'lib/capitalize';
import { List }             from 'immutable';
import { Chapter as ChapterRecord }          from 'records/Records';

const Dropzone = ifdefBrowser( () => {
  return require('dropzone');
});

const MediumEditor = ifdefBrowser( () => {
    require('medium-editor/dist/css/medium-editor.min.css');

    return require('medium-editor');
});

const CheekyKeys = ifdefBrowser( () => require('lib/cheeky-keys').default);

class Chapter extends React.Component {
  static propTypes = {
    dispatch:    PropTypes.func.isRequired,
    route:       PropTypes.object.isRequired,
    location:    PropTypes.object.isRequired,
    routeParams: PropTypes.object.isRequired,
    chapter:     PropTypes.object.isRequired,
    editing:     PropTypes.bool.isRequired,
    currentUser: PropTypes.string,
    breadcrumbs: PropTypes.instanceOf(List),
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store:  PropTypes.object
  };

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

    this.componentDidMount    = this.componentDidMount.bind(this);
    this.componentWillUpdate  = this.componentWillUpdate.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.deployChapter        = this.deployChapter.bind(this);
    this.flushChapter         = this.flushChapter.bind(this);
    this.deployChapter        = this.deployChapter.bind(this);
    this.exportText           = this.exportText.bind(this);
    this.handleSave           = this.handleSave.bind(this);
    this.handleDelete         = this.handleDelete.bind(this);
    this.handlePublish        = this.handlePublish.bind(this);
    this.setEditing           = this.setEditing.bind(this);
    this.pushBreadcrumb       = this.pushBreadcrumb.bind(this);
    this.updateChapter        = this.updateChapter.bind(this);
    this.updateSubChapter     = this.updateSubChapter.bind(this);
  }

  componentDidMount () {
    const sessionToken = getToken();
    const dropzoneOpts = {
      url:     '/api/chapters' + (this.props.routeParams.id ? ('/' + this.props.routeParams.id) : ''),
      method:  'put',
      headers: {
        Authorization: 'Bearer ' + sessionToken
      },
      clickable: false
    };
    const isNew   = /^new/.test(this.props.route.name);

    (new Dropzone('#chapter-body', dropzoneOpts))
      .on('sending', function(file, xhr, formData) {
        formData.append('filename', file.name);
      })
      .on('complete', () => {
        this.props.dispatch(ChapterActions.getChapter(this.props.chapter.get('id')));
      });

    if(isNew) {
      this.props.dispatch(ChapterActions.setEditing(true));

      if(!this.props.chapter.get('author'))
        this.updateChapter({ author: this.props.currentUser })
    }
    else if(this.props.routeParams.id) {
      this.props.dispatch(ChapterActions.getChapter(this.props.routeParams.id));
    }

    this.pushBreadcrumb()
  };

  componentWillUpdate (nextProps) {
    // Setup editor options
    const editorOpts = {
      placeholder: {
        text: 'Type something, please'
      },
      extensions: {
        'cheeky-keys': new CheekyKeys()
      }
    };

    if(nextProps.editing && !this.props.editing) {
      if(this.editor) 
        this.editor.setup();
      else
        this.editor = new MediumEditor('#chapter-body', editorOpts);
    } else if(this.props.editing && !nextProps.editing) {
      this.editor.destroy();
    }

    const isNewID = (
      (nextProps.routeParams.id) &&
      (nextProps.routeParams.id !== this.props.routeParams.id)
    );

    const isNew   = (/^new/.test(nextProps.route.name) && !/^new/.test(this.props.route.name));

    if (isNewID) {
      this.flushChapter();

      this.props.dispatch(ChapterActions.getChapter(nextProps.routeParams.id));

      if (this.props.breadcrumbs.get(this.props.breadcrumbs.count() - 1).get('id') !== this.props.chapter.get('id')) {
        this.pushBreadcrumb();
      }
    }

    if (isNew) {
      this.flushChapter();
      window.scroll(0, 0);
      this.updateChapter({ author: this.props.currentUser });
    }
  };

  componentWillUnmount () {
    this.flushChapter();
    this.props.dispatch(ChapterActions.setEditing(false));
  };

  flushChapter () {
    this.props.dispatch(ChapterActions.flushChapter());
  };

  deployChapter (payload) {
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
  };

  exportText () {
    const html      = this.refs['chapter-body'].innerHTML;
    const splitPeas = html.split('</p>');

    // Yeah I'm going all the way with this. This is what wine does.
    const peas = splitPeas
      .map(p => p.replace(/(\<p\>)|(\<br\>)|\n/, ''))

    if((peas.length === 1) && peas[0] === '')
      return '';

    return peas.join('\n\n');
  };

  handleSave () {
    const payload = {
      title:     this.props.chapter.get('title'),
      author:    this.props.chapter.get('author'),
      markdown:  this.exportText(),
      ordered:   this.props.chapter
                     .get('ordered')
                     .toJS()
                     .map(chapter => ({
                       id:          chapter.id,
                       title:       chapter.title,
                       description: chapter.description
                     })),
      unordered: this.props.chapter.get('unordered').toJS().map(i => i.id),
      isOrdered: this.props.location.query.ordered === '1' ? true : false
    };

    return this.deployChapter(payload)
      .then(success => {
        if(success) {
          this.props.dispatch(ChapterActions.setEditing(false));
          this.context.router.push('/chapters/' + this.props.chapter.get('id'));
        }
      });
  };

  handleDelete () {
    this.props.dispatch(ChapterActions.deleteChapter(this.props.routeParams.id))
      .then(() => this.context.router.push('/home'));
  };

  handlePublish () {
    const payload = {
      title:    this.props.chapter.get('title'),
      author:   this.props.chapter.get('author'),
      markdown: this.exportText(),
      ordered:  [],
      public:   (bool || bool === false) ? bool : true
    };

    const promise = this.deployChapter(payload);

    return promise
      .then(success => {
        if(success) this.props.dispatch(ChapterActions.setEditing(false));
      });
  };

  setEditing () {
    this.props.dispatch(ChapterActions.setEditing(true));
  };

  pushBreadcrumb () {
    this.props.dispatch(SessionActions.pushBreadcrumb(
      {
        id:    this.props.chapter.get('id'),
        title: this.props.chapter.get('title'),
      }
    ));
  }

  updateChapter (changes) {
    this.props.dispatch(
      ChapterActions.setChapter(changes)
    );
  }

  updateSubChapter (type, index, changes) {
    this.props.dispatch(
      ChapterActions.setSubChapter(type, index, changes)
    );
  }

  render () {
    const dropzoneOpts = {
      url:     '/api/chapters' + (this.props.routeParams.id ? ('/' + this.props.routeParams.id) : ''),
      method:  'put',
      headers: {
        Authorization:       'Bearer ' + getToken(),
        ['X-chapter-id']:    this.props.routeParams.id || null,
        ['X-chapter-title']: this.props.chapter.get('title') || null
      },
      clickable: true
    };

    const titleStyle = {
      display: 'inline-block',
      marginBottom: '0px'
    };

    const authorStyle = {
      display: 'inline'
    };

    const subList  = this.props.chapter.get('ordered')
      .map(chapter => ({
        title:       chapter.get('title'),
        separator:   '&nbsp;',
        description: chapter.get('description') || '???',
        adendum:     'By ' + capitalize(chapter.get('author')),
        href:        ['/chapters', chapter.get('id')].join('/')
      }));

    const subCards = this.props.chapter.get('unordered')
      .map(chapter => ({
        title: chapter.get('title'),
        body:  <em>{chapter.description || '???'}</em>,
        href:  ['/chapters', chapter.get('id')].join('/')
      }));

    const newChapter = /^new/.test(this.props.route.name);

    const showBody  = (this.props.chapter.get('markdown') || this.props.editing);
    const showList  = !(subList.size ? true  : (this.props.editing || newChapter));
    const showCards = !(subCards.size ? true : (this.props.editing || newChapter));

    return (
      <div id="chapter">
        <ChapterBreadcrumbs crumbs={this.props.breadcrumbs} />

        <div id="chapter-title">
          <EditableHeader
            style={titleStyle}
            header={this.props.chapter.get('title')}
            placeholder="Untitled"
            editing={this.props.editing}
            update={(t) => { this.updateChapter({ title: t }) }} />

          <ChapterToolbar
            defaultFont={this.cfg.defaultFont}
            dropzoneOpts={dropzoneOpts}
            editing={this.props.editing}
            display={ newChapter || this.props.chapter.get('write')}
            public={this.props.chapter.get('public')}
            setEditing={this.setEditing}
            save={this.handleSave}
            del={this.handleDelete}
            publish={this.handlePublish}
            refreshChapter={() => { this.props.dispatch(ChapterActions.getChapter(this.props.chapter.get('id'))) }}
            uploadURL={'/api/chapteArs' + (this.props.routeParams.id ? ('/' + this.props.routeParams.id) : '')} />
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
            capitalize={true}
            update={(a) => { this.updateChapter({ author: a }) }} />

          <hr />
        </div>

        <Collapsable collapsed={!showBody}>
          <button onClick={() => this.setState( { bodyCollapsed: !this.state.bodyCollapsed } )}>Collapse</button>
          <hr />
        </Collapsable>

        <Collapsable collapsed={this.state.bodyCollapsed || !showBody}>
          <div id="chapter-body" ref="chapter-body" dangerouslySetInnerHTML={{__html: this.props.chapter.get('html')}}>
          </div>
          <hr />
        </Collapsable>

        <Collapsable collapsed={showList}>
          <div id="chapter-list">
            <ListView
              elements={subList}
              editing={this.props.editing}
              createUrl={['/chapters', this.props.chapter.get('id'), 'new'].join('/') + '?ordered=1'}
              reinsert={(from, to) => {
                const current = this.props.chapter.get('ordered');
                const val     = current.get(from);
                const newList = current
                  .splice(from, 1)
                  .splice(to, 0, val);

                  this.updateChapter({ ordered: newList });

                  return newList;
                }}
              onChange={change => {
                  this.updateSubChapter('ordered', change.index, change.changes);
                }}
              addNew={() => {
                  this.updateChapter({ ordered: this.props.chapter.get('ordered').push(ChapterRecord()) });
                }}
            />
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
              createUrl={['/chapters', this.props.chapter.get('id'), 'new'].join('/') + '?ordered=0'}
              onChange={change => {
                  this.updateSubChapter('unordered', change.index, change.changes);
                }}
              addNew={() => {
                  this.updateChapter({ unordered: this.props.chapter.get('unordered').push(ChapterRecord()) });
                }} />
          </div>
        </Collapsable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chapter:     state.chapter.get('chapter'),
    editing:     state.chapter.get('editing'),
    currentUser: state.session.get('name'),
    breadcrumbs: state.session.get('breadcrumbs')
  }
};

export default connect(mapStateToProps)(Chapter);

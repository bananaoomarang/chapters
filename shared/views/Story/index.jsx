import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'redux/react';
import StoryTitle           from './Title';
import StoryToolbar         from './Toolbar';
import ParagraphView        from './ParagraphView';
import * as StoryActions    from 'actions/StoryActions';
import ifdefBrowser         from 'lib/ifdefBrowser';

var Dropzone = ifdefBrowser( () => {
  return require('dropzone');
});

@connect(state => state.story.toJS())

export default class Story extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    story:    PropTypes.object.isRequired,
    editing:  PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.cfg = {
      defaultFont: {
        size: 24
      },
      defaultAlignment: 'center'
    };

    StoryActions.getStory(props.params.id)(props.dispatch);
  }

  componentDidMount() {
    const sessionToken = window.sessionStorage.getItem('token');

    const dropzoneOpts = {
      url:     '/stories/upload',
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    const dropzone  = new Dropzone('#story', dropzoneOpts);

    dropzone.on('sending', function(file, xhr, formData) {
      formData.append('filename', file.name);
    });
  }

  handleSave = () => {
    const payload = {
      id:    this.props.story.id,
      title: this.props.story.title,
      text:  this.exportText()
    };

    StoryActions.postStory(payload)( (action) => {
      this.props.dispatch(action);

      this.props.dispatch(
        StoryActions.setEditing(false)
      );
    });
  }

  // Concatanate html tags into one string for exporting
  exportText = () => {
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
  }

  setEditing = () => {
    this.props.dispatch(StoryActions.setEditing(true));
  }

  render () {
    const editButtonStyle = {
      display: this.props.editing ? 'none' : 'inline'
    };

    return (
      <div id="story">
        <StoryToolbar handleSave={this.handleSave} defaultFont={this.cfg.defaultFont} />

        <StoryTitle title={this.props.story.title} placeholder="Untitled" />

        <button className='btn' style={editButtonStyle} onClick={this.setEditing}>Edit</button>

        <hr />

        <h2>
          By&nbsp;
          <Link to="user" params={ { user: this.props.story.author } }>{this.props.story.author}</Link>
        </h2>

        <br/>

        <ParagraphView defaultFont={this.cfg.defaultFont} alignment={this.cfg.defaultAlignment} paragraphs={this.props.story.paragraphs} />
      </div>
    );
  }
}

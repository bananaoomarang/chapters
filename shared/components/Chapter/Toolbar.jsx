import React, { PropTypes } from 'react';
import classSet             from 'classnames';
import ifdefBrowser         from 'lib/ifdefBrowser';
import assign               from 'object-assign';

Object.assign = assign;

const Dropzone = ifdefBrowser( () => {
  return require('dropzone');
});

export default class Toolbar extends React.Component {
  static propTypes = {
    defaultFont:    PropTypes.object.isRequired,
    dropzoneOpts:   PropTypes.object.isRequired,

    save:           PropTypes.func.isRequired,
    del:            PropTypes.func.isRequired,
    setEditing:     PropTypes.func.isRequired,
    publish:        PropTypes.func.isRequired,
    refreshChapter: PropTypes.func.isRequired,

    public:         PropTypes.bool.isRequired,
    editing:        PropTypes.bool.isRequired,
    display:        PropTypes.bool.isRequired
  }

  static contextTypes = {
    routeParams: PropTypes.object
  }

  componentDidMount = () => {
    this.dropzone = new Dropzone('#toolbar-upload-button', this.props.dropzoneOpts);
    
    this.dropzone
      .on('sending', function(file, xhr, formData) {
        formData.append('filename', file.name);
      })
      .on('complete', () => {
        this.props.refreshChapter();
      });
  }

  componentWillUpdate = (nextProps) => {
    this.dropzone.options = Object.assign(this.dropzone.options, nextProps.dropzoneOpts);
  }

  render() {
    const classes = classSet({
      hidden: !this.props.display
    });

    const editClasses = classSet({
      hidden:  this.props.editing,
      'btn-group': true
    });

    const editingClasses = classSet({
      hidden:      !this.props.editing,
      'btn-group': true
    });

    return (
      <div id="chapter-toolbar" className={classes}>
        <div className={editClasses}>
          <button className="btn-group-member" onClick={this.props.setEditing}>Edit</button>

          {
            (() => {
              return this.props.public ?
                <button className="btn-group-member" onClick={this.props.publish.bind(null, false)}>Unpublish</button> :
                <button className="btn-group-member" onClick={this.props.publish.bind(null, true)}>Publish</button>
            })()
          }

          <button className="btn-group-member" name="delete" onClick={this.props.del}>Delete</button>
        </div>

        <div className={editingClasses}>
          <button className="btn-group-member" name="save"   onClick={this.props.save}>Save</button>
          <button id="toolbar-upload-button" className="btn-group-member" name="upload">Upload</button>
        </div>
      </div>
    );
  }
}

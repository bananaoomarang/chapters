import React, { PropTypes } from 'react';
import classSet             from 'classnames';

export default class Toolbar extends React.Component {
  static propTypes = {
    defaultFont: PropTypes.object.isRequired,
    save:        PropTypes.func.isRequired,
    del:         PropTypes.func.isRequired,
    setEditing:  PropTypes.func.isRequired,
    publish:     PropTypes.func.isRequired,
    editing:     PropTypes.bool.isRequired,
    display:     PropTypes.bool.isRequired,

    id:          PropTypes.string
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
          <button className="btn-group-member" onClick={this.props.publish}>Publish</button>
        </div>

        <div className={editingClasses}>
          <button className="btn-group-member" name="save"   onClick={this.props.save}>Save</button>
          <button className="btn-group-member" name="delete" onClick={this.props.del}>Delete</button>
        </div>
      </div>
    );
  }
}

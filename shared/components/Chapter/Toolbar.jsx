import React, { PropTypes }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import classSet               from 'classnames';
import FontSizeSelector       from './FontSizeSelector';
import * as ChapterActions      from 'actions/ChapterActions';

@connect(state => ({
  editing:          state.chapter.get('editing'),
  focusedParagraph: state.chapter.getIn(['chapter', 'focusedParagraph']),
  id:               state.chapter.getIn(['chapter', 'id'])
}))

export default class Toolbar extends React.Component {
  static propTypes = {
    dispatch:         PropTypes.func.isRequired,
    history:          PropTypes.object.isRequired,
    defaultFont:      PropTypes.object.isRequired,
    handleSave:       PropTypes.func.isRequired,
    editing:          PropTypes.bool.isRequired,
    focusedParagraph: PropTypes.number,
    id:               PropTypes.string
  }

  handleAlignment = (e) => {
    this.props.dispatch(ChapterActions.setAlignment(e.target.name, this.props.focusedParagraph));
  }

  handleDelete = () => {
    this.props.dispatch(ChapterActions.deleteChapter(this.props.id))
      .then(() => this.history.pushState(null, '/home'));
  }

  render() {
    const classes = classSet({
      toolbar:   true,
      hidden:    !this.props.editing
    });

    return (
      <div className={classes}>
        <FontSizeSelector defaultSize={this.props.defaultFont.size} focusedParagraph={this.props.focusedParagraph} {...bindActionCreators(ChapterActions, this.props.dispatch)}/>

        <br />

        <div className="btn-group">
            <button className="btn-group-member" name="left"   onClick={this.handleAlignment}>Left</button>
            <button className="btn-group-member" name="center" onClick={this.handleAlignment}>Center</button>
            <button className="btn-group-member" name="right"  onClick={this.handleAlignment}>Right</button>
        </div>

        <br />

        <div className="btn-group">
            <button className="btn-group-member" name="save"   onClick={this.props.handleSave}>Save</button>
            <button className="btn-group-member" name="delete" onClick={this.handleDelete}>Delete</button>
        </div>

        <hr />

      </div>
    );
  }
}

import React, { PropTypes }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import FontSizeSelector       from './FontSizeSelector';
import * as StoryActions      from 'actions/StoryActions';

@connect(state => ({
  editing:          state.story.get('editing'),
  focusedParagraph: state.story.getIn(['story', 'focusedParagraph']),
  id:               state.story.getIn(['story', 'id'])
}))

export default class Toolbar extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    dispatch:         PropTypes.func.isRequired,
    defaultFont:      PropTypes.object.isRequired,
    handleSave:       PropTypes.func.isRequired,
    editing:          PropTypes.bool.isRequired,
    focusedParagraph: PropTypes.number,
    id:               PropTypes.string
  }

  handleAlignment = (e) => {
    this.props.dispatch(StoryActions.setAlignment(e.target.name, this.props.focusedParagraph));
  }

  handleDelete = () => {
    this.props.dispatch(StoryActions.deleteStory(this.props.id))
      .then(() => this.context.router.transitionTo('/home'));
  }

  render() {
    const style = {
      display: this.props.editing ? 'block' : 'none'
    };

    return (
      <div className='toolbar' style={style}>
        <FontSizeSelector defaultSize={this.props.defaultFont.size} focusedParagraph={this.props.focusedParagraph} {...bindActionCreators(StoryActions, this.props.dispatch)}/>

        <br />

        <button className="btn" name="left"   onClick={this.handleAlignment}>Left</button>
        <button className="btn" name="center" onClick={this.handleAlignment}>Center</button>
        <button className="btn" name="right"  onClick={this.handleAlignment}>Right</button>

        <br />

        <button className="btn" name="save"   onClick={this.props.handleSave}>Save</button>
        <button className="btn" name="delete" onClick={this.handleDelete}>Delete</button>

        <hr />

      </div>
    );
  }
}

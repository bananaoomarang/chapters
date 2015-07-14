import React, { PropTypes }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import FontSizeSelector       from './FontSizeSelector';
import * as StoryActions      from 'actions/StoryActions';

@connect(state => ({
  editing:          state.story.get('editing'),
  focusedParagraph: state.story.getIn(['story', 'focusedParagraph'])
}))

export default class Toolbar extends React.Component {
  static propTypes = {
    dispatch:         PropTypes.func.isRequired,
    defaultFont:      PropTypes.object.isRequired,
    handleSave:       PropTypes.func.isRequired,
    editing:          PropTypes.bool.isRequired,
    focusedParagraph: PropTypes.number
  }

  handleAlignment = (e) => {
    this.props.dispatch(StoryActions.setAlignment(e.target.name, this.props.focusedParagraph));
  }

  render() {
    const style = {
      display: this.props.editing ? 'block' : 'none'
    };

    return (
      <div className='toolbar' style={style}>
        <FontSizeSelector defaultSize={this.props.defaultFont.size} focusedParagraph={this.props.focusedParagraph} {...bindActionCreators(StoryActions, this.props.dispatch)}/>

        <br />

        <button className="btn" name="left"   onClick={this.handleAlignment} >Left</button>
        <button className="btn" name="center" onClick={this.handleAlignment} >Center</button>
        <button className="btn" name="right"  onClick={this.handleAlignment} >Right</button>

        <br />

        <button className="btn" name="save"   onClick={this.props.handleSave}>Save</button>

        <hr />

      </div>
    );
  }
}

import React                  from 'react';
import { connect }            from 'redux/react';
import { bindActionCreators } from 'redux';
import FontSizeSelector       from './FontSizeSelector';
import * as StoryActions      from 'actions/StoryActions';

@connect(state => ({
  editing: state.story.get('editing')
}))

export default class Toolbar extends React.Component {
  handleAlignment = (e) => {
  }

  handleLoad = () => {
    StoryActions.populateStories()(this.props.dispatch);
    this.props.dispatch(this.props.setLoading(true));
  }

  render() {
    const style = {
      display: this.props.editing ? 'block' : 'none'
    };

    return (
      <div className='toolbar' style={style}>
        <FontSizeSelector defaultSize={this.props.defaultFont.size} {...bindActionCreators(StoryActions, this.props.dispatch)}/>

        <br />

        <button className="btn" name="left"   onClick={this.handleAlignment} >Left</button>
        <button className="btn" name="center" onClick={this.handleAlignment} >Center</button>
        <button className="btn" name="right"  onClick={this.handleAlignment} >Right</button>

        <br />

        <button className="btn" name="load"   onClick={this.handleLoad}      >Load</button>
        <button className="btn" name="save"   onClick={this.props.handleSave}>Save</button>

      </div>
    );
  }
}

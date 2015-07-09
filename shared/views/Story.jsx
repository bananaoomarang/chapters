import React        from 'react';
import { Link }     from 'react-router';
import StoryReducer   from 'reducers/StoryReducer';
import StoryActions from 'actions/StoryActions';

var Story = {
  statics: {
    storeListeners: {
      _onChange: StoryReducer
    }
  },

  getInitialState () {
    return StoryReducer.getState().currentStory;
  },

  _onChange () {
    this.setState(StoryReducer.getState().currentStory);
  },

  componentDidMount () {
    StoryActions.loadStory(this.props.params.id);
  },

  render () {
    return (
      <div id="story">
        <h1>{this.state.title}</h1>

        <h2>
          By&nbsp;
          <Link to="user" params={ { user: this.state.author } }>{this.state.author}</Link>
        </h2>

        <br/>

        <div dangerouslySetInnerHTML={ { __html: this.state.html } } />
      </div>
    );

  }
};

module.exports = React.createClass(Story);

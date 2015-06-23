import React        from 'react';
import { Link }     from 'react-router';
import FluxyMixin   from 'alt/mixins/FluxyMixin';
import StoryStore   from '../stores/StoryStore';
import StoryActions from '../actions/StoryActions';

var Story = {
  displayName: 'Story',

  mixins: [FluxyMixin],

  statics: {
    storeListeners: {
      _onChange: StoryStore
    }
  },

  getInitialState: function () {
    return StoryStore.getCurrentStory();
  },

  _onChange: function () {
    this.setState(StoryStore.getState().currentStory);
  },

  componentDidMount: function () {
    StoryActions.loadStory(this.props.params.id);
  },

  render: function () {
    return (
      <div id="story">
        <h1>{this.state.title}</h1>

        <h2>
          By&nbsp;
          <Link to="user" params={ { user: this.state.author } }>{this.state.author}</Link>
        </h2>

        <br/>

        <p>{this.state.text}</p>
      </div>
    );

  }
};

module.exports = React.createClass(Story);

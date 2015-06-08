'use strict';

var React          = require('react');
var StoryStore     = require('../stores/StoryStore');
var StoryActions   = require('../actions/StoryActions');
var Link           = require('react-router').Link;

var Story = {
  displayName: 'Story',

  getInitialState: function () {
    return StoryStore.getCurrentStory();
  },

  onStoryChange: function () {
    this.setState(StoryStore.getCurrentStory());
  },

  componentDidMount: function () {
    StoryStore.addChangeListener(this.onStoryChange);

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

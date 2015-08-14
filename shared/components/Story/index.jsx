import React       from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  story: state.story.get('story')
}))

export default class Story extends React.Component {
  render() {
    return (
      <h1>{this.state.story.title}</h1>
    );
  }
}

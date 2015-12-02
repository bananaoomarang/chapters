import React, { PropTypes } from 'react';

export default class NewStory extends React.Component {
  render() {
    const divStyle = {
      width: '50%',
      'text-align': 'center'
    };

    return (
      <div id="new-story">
        <div style={divStyle}>
          <h1>Text</h1>
        </div>

        <div style={divStyle}>
          <h1>Chapters</h1>
        </div>
      </div>
    )
  }
}

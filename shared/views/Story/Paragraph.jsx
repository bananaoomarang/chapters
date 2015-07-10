import React       from 'react';
import { connect } from 'redux/react'

@connect(state => ({
  editing: state.story.get('editing') 
}))

export default class Paragraph extends React.Component {
  state = {
    focused: false
  }

  render () {
    return (
      <p type="number" data-index={this.props.index} onBlur={this.props.onBlur} onFocus={this.props.onFocus} contentEditable={this.props.editing}>{this.props.text}</p>
    );
  }
}

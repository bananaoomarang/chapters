import React from 'react';

export default class FontSizeSelector extends React.Component {
  static propTypes = {
    setFont:          React.PropTypes.func.isRequired,
    defaultSize:      React.PropTypes.number.isRequired,
    focusedParagraph: React.PropTypes.number
  }

  state = {
    value: this.props.defaultSize
  }

  componentDidMount = () => {
    var font = {
      size: this.state.value
    };

    this.props.setFont(font, this.props.focusedParagraph);
  }

  onChange = (e) => {
    var font = {
      size: e.target.value
    };

    this.props.setFont(font, this.props.focusedParagraph);

    this.setState({
      value: event.target.value
    });
  }

  render () {

    return (
      <input type="number" value={this.state.value} onChange={this.onChange} ></input>
    );

  }

}

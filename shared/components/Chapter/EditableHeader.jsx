import React, { PropTypes } from 'react';
import classSet             from 'classnames';

export default class EditableHeader extends React.Component {
  static propTypes = {
    update:      PropTypes.func.isRequired,
    header:      PropTypes.string.isRequired,
    editing:     PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    style:       PropTypes.obj
  }

  state = {
    clicked: false
  }

  handleBlur = () => {
    this.setState({
      clicked: false
    });
  }

  handleFocus = () => {
    var headerDOM = this.refs.header;

    if (headerDOM.textContent === this.props.placeholder)
      headerDOM.textContent = '';

    this.setState({ clicked: true }, function () {
      headerDOM.focus();
    });
  }

  handleChange = (e) => {
    this.props.update(e.target.textContent);
  }

  render () {
    const classes = classSet({
      greyed: this.props.header ? false : true
    });

    if(!this.props.editing)
      return (
        <h1 style={this.props.style} className={classes} onFocus={this.handleFocus}>
          {this.props.header || this.props.placeholder}
        </h1>
      );

    return (
      <h1 style={this.props.style} ref="header" className={classes} contentEditable={this.props.editing} onFocus={this.handleFocus} onBlur={this.handleBlur} onInput={this.handleChange} >
        {
          this.state.clicked ?
            (this.props.header || '') :
            (this.props.header || this.props.placeholder)
        }
      </h1>
    );
  }
}

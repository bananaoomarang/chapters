import React, { PropTypes } from 'react';
import classSet             from 'classnames';
import capitalize           from 'lib/capitalize';

export default class EditableHeader extends React.Component {
  static propTypes = {
    update:      PropTypes.func.isRequired,
    header:      PropTypes.string.isRequired,
    editing:     PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,

    style:       PropTypes.object,
    capitalize:  PropTypes.bool
  };

  state = {
    clicked: false
  };

  handleBlur = (e) => {
    this.setState({
      clicked: false
    });

    this.props.update(e.target.textContent);
  };

  handleFocus = () => {
    const headerDOM = this.refs.header;

    this.setState({ clicked: true }, function () {
      headerDOM.focus();
    });
  };

  render () {
    const classes = classSet({
      greyed: this.props.header ? false : true
    });

    if(!this.props.editing)
      return (
        <h1 style={this.props.style} className={classes} onFocus={this.handleFocus}>
          {this.props.capitalize ? capitalize(this.props.header || this.props.placeholder) : (this.props.header || this.props.placeholder)}
        </h1>
      );

    return (
      <h1 style={this.props.style} ref="header" className={classes} contentEditable={this.props.editing} onClick={this.handleFocus} onFocus={this.handleFocus} onBlur={this.handleBlur} >
        {
          this.state.clicked ?
            (this.props.header || '') :
            (this.props.header || this.props.placeholder)
        }
      </h1>
    );
  }
}

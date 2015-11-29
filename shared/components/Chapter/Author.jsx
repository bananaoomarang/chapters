import React, { PropTypes } from 'react';
import classSet             from 'classnames';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';
import * as ChapterActions  from 'actions/ChapterActions';
import capitalize           from 'lib/capitalize';

export default class ChapterTitle extends React.Component {
  static propTypes = {
    dispatch:    PropTypes.func.isRequired,
    author:      PropTypes.string.isRequired,
    editing:     PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired
  }

  state = {
    clicked: false
  }

  handleBlur = (e) => {
    this.props.dispatch(
      ChapterActions.setChapter({
        author: e.target.textContent
      })
    );

    this.setState({
      clicked: false
    });
  }

  handleClick = () => {
    this.setState({ clicked: true }, function () {
      var authorDOM = this.refs.author;

      authorDOM.focus();
    });
  }

  render () {
    const classes = classSet({
      greyed: this.props.author ? false : true
    });

    if(!this.props.editing)
      return (
        <h2>
          By&nbsp;
          <span id="author" ref="author" onClick={this.handleClick}>
            <Link to={`/users/${this.props.author}`}>{capitalize(this.props.author || this.props.placeholder)}</Link>
          </span>
        </h2>
      );

    return (
      <h2>
        By&nbsp;
        <span id="author" ref="author" contentEditable={this.props.editing} onBlur={this.handleBlur}>
          {this.props.author ? capitalize(this.props.author) : ''}
        </span>
      </h2>
    );
  }
}

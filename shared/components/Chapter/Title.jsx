import React, { PropTypes } from 'react';
import classSet             from 'classnames';
import { connect }          from 'react-redux';
import * as ChapterActions  from 'actions/ChapterActions';

export default class ChapterTitle extends React.Component {
  static propTypes = {
    dispatch:    PropTypes.func.isRequired,
    title:       PropTypes.string.isRequired,
    editing:     PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired
  }

  state = {
    clicked: false
  }

  handleBlur = (e) => {
    this.props.dispatch(
      ChapterActions.setChapter({
        title: e.target.textContent
      })
    );

    this.setState({
      clicked: false
    });
  }

  handleClick = () => {
    this.setState({ clicked: true }, function () {
      var titleDOM = this.refs.title;

      titleDOM.focus();
    });
  }

  render () {
    const classes = classSet({
      greyed: this.props.title ? false : true
    });

    if(!this.props.editing)
      return (
        <h1 id="title" className={classes} onClick={this.handleClick}>
          {this.props.title || this.props.placeholder}
        </h1>
      );

    return (
      <h1 id="title" ref="title" contentEditable={this.props.editing} onBlur={this.handleBlur}>
        {this.props.title || ''}
      </h1>
    );
  }
}

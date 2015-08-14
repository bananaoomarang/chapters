import React             from 'react';
import classSet          from 'classnames';
import { connect }       from 'react-redux';
import * as ChapterActions from 'actions/ChapterActions';

@connect(state => ({
  editing: state.chapter.get('editing')
}))

export default class ChapterTitle extends React.Component {
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
      var titleDOM = this.refs.title.getDOMNode();

      titleDOM.focus();
    });
  }

  render () {

    const classes = classSet({
      greyed: this.props.title ? false : true
    });

    var display;

    if(this.state.clicked) {

      display = this.props.title ? this.props.title : '';

      return (
        <h1 id="title" ref="title" contentEditable={this.props.editing} onBlur={this.handleBlur}>{display}</h1>
      );

    } else {

      display = this.props.title ? this.props.title : this.props.placeholder;

      return (
        <h1 id="title" className={classes} onClick={this.handleClick}>{display}</h1>
      );

    }

  }
}

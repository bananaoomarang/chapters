import React             from 'react';
import classSet          from 'classnames';
import * as StoryActions from 'actions/StoryActions';

export default class StoryTitle extends React.Component {
  state = {
    clicked: false
  }

  handleInput = (e) => {

    this.props.dispatch(
      StoryActions.setStory({
        title: e.target.innerText
      })
    );

  }

  handleBlur = () => {
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
      placeholder: this.props.title ? false : true
    });

    var display;

    if(this.state.clicked) {

      display = this.props.title ? this.props.title : '';

      return (
        <h1 id="title" ref="title" contentEditable="true" onInput={this.handleInput} onBlur={this.handleBlur}>{display}</h1>
      );

    } else {

      display = this.props.title ? this.props.title : this.props.placeholder;

      return (
        <h1 id="title" className={classes} onClick={this.handleClick}>{display}</h1>
      );

    }

  }
}

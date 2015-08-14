import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import classSet             from 'classnames';
import * as StoryActions    from 'actions/StoryActions';

@connect(state => ({
  username: state.session.get('name'),
  story:    state.story.get('story'),
  error:    state.story.get('error')
}))

export default class NewStory extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
  }

  state = {}

  handleFormSubmit = () => {
    const payload = {
      title:  this.refs.title.getDOMNode().value,
      author: this.refs.author.getDOMNode().value,
      owner:  this.props.username
    }
    this.props.dispatch(StoryActions.postStory(payload));
  }

  componentDidUpdate = () => {
    console.log(this.props.story.toJS())
    if(this.props.story.get('title'))
      this.context.router.transitionTo('/stories/' + this.props.story.get('id'));
  }

  render() {
    const errClasses = classSet({
      'error-msg': true,
      'invisible': !this.state.error
    });

    return (
      <div id="new-story" className="form">
        <input type="text" name="title"  ref="title"  placeholder="The Iliad" />
        <input type="text" name="author" ref="author" placeholder="Homer"     />

        <button className="btn" name="story-submit" onClick={this.handleFormSubmit}>Next</button>

        <a className={errClasses}>{this.state.error}</a>
      </div>
    );
  }
}

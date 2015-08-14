import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import classSet             from 'classnames';
import * as SectionActions  from 'actions/SectionActions';

@connect(state => ({
  username: state.session.get('name'),
  section:  state.story.get('story'),
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
    this.props.dispatch(SectionActions.postSection(this.props.routeParams.id, payload))
      .then(function () {
        this.context.router.transitionTo('/stories/' + this.props.routeParams.id + '/' + this.props.section.id);
      });
  }

  render() {
    const errClasses = classSet({
      'error-msg': true,
      'invisible': !this.state.error
    });

    return (
      <div id="new-section" className="form">
        <input type="text" name="title"  ref="title"  placeholder="Hector's Demise" />
        <input type="text" name="author" ref="author" placeholder="Homer"           />

        <button className="btn" name="section-submit" onClick={this.handleFormSubmit}>Next</button>

        <a className={errClasses}>{this.state.error}</a>
      </div>
    );
  }
}

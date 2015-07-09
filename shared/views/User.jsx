import React    from 'react';
import { Link } from 'react-router';

var User = {
  getInitialState () {
    return {};
  },

  onSessionChange () {
    this.setState({});
  },

  componentDidMount () {
    return;
  },

  render () {
    return (
      <div id="user">
        <h1>{this.props.params.user}</h1>
        <br />
        <Link to="user-stories" params={this.props.params}>Stories</Link>
      </div>
    );
  }
};

export default React.createClass(User);

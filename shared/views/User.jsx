import React    from 'react';
import { Link } from 'react-router';

var User = {
  getInitialState: function () {
    return {};
  },

  onSessionChange: function () {
    this.setState({});
  },

  componentDidMount: function () {
    return;
  },

  render: function () {
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

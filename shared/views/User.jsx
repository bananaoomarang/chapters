import React    from 'react';
import { Link } from 'react-router';

export default class User extends React.Component {
  render() {
    return (
      <div id="user">
        <h1>{this.props.params.user}</h1>

        <br />

        <Link to="user-stories" params={this.props.params}>Stories</Link>
      </div>
    );
  }
}

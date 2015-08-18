import React, { PropTypes } from 'react';
import { Link }             from 'react-router';

export default class User extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired
  }

  render() {
    return (
      <div id="user">
        <h1>{this.props.routeParams.user}</h1>

        <br />

        <Link to={'/users/' + this.props.routeParams.user + '/stories'}>Stories</Link>
      </div>
    );
  }
}

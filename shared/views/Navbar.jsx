import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';

@connect(state => ({
  legit:    state.session.get('legit'),
  username: state.session.get('name')
}))

export default class Navbar extends React.Component {
  static propTypes = {
    legit:    PropTypes.bool.isRequired,
    username: PropTypes.string
  }

  render() {
    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <h2 className="logo">
            <Link to="/home">Chapters</Link>
          </h2>
          <a href="javascript:void(0)" className="navigation-menu-button">Mobile Placeholder</a>

          <div className="right">

            <nav className="nav-item" role="navigation" style={ { display: this.props.legit ? 'none' : 'inline-block' } }>

              <ul className="btn-group">
                <li className="nav-link">
                  <Link to="/login">
                    <button className="btn-group-member">Login</button>
                  </Link>
                </li>

                <li className="nav-link">
                  <Link to="/register">
                    <button className="btn-group-member">Sign up</button>
                  </Link>
                </li>
              </ul>

            </nav>

            <span className="greyed nav-item" style={ { display: this.props.legit ? 'inline-block' : 'none' } }>
              Signed in as {this.props.username}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

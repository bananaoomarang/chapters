import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';
import * as SessionActions  from 'actions/SessionActions';

@connect(state => ({
  legit:    state.session.get('legit'),
  username: state.session.get('name')
}))

export default class Navbar extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    legit:    PropTypes.bool.isRequired,
    username: PropTypes.string
  }

  handleSignOut = () => {
    window.sessionStorage.removeItem('token');
    this.props.dispatch(SessionActions.close());
  }

  render() {
    const appearLoggedIn = {
      display: this.props.legit ? 'inline-block' : 'none'
    };

    const appearLoggedOut = {
      display: !this.props.legit ? 'inline-block' : 'none'
    };

    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <h1 className="logo">
            <Link to="/home">Chapters</Link>
          </h1>

          <div className="right">

            <nav className="nav-item" role="navigation">

              <ul className="btn-group" style={appearLoggedOut}>

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

              <ul style={appearLoggedIn}>

                <li className="nav-link">
                  <button className="btn-group-member" onClick={this.handleSignOut}>Sign out</button>
                </li>
                <li className="nav-link">
                  <span className="greyed" style={ { display: this.props.legit ? 'inline-block' : 'none' }  }>
                    Signed in as {this.props.username}
                  </span>
                </li>

              </ul>

            </nav>
          </div>
        </div>
      </header>
    );
  }
}

import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';
import * as SessionActions  from 'actions/SessionActions';

class Navbar extends React.Component {
  static propTypes = {
    dispatch:  PropTypes.func.isRequired,
    legit:     PropTypes.bool.isRequired,
    nightMode: PropTypes.bool.isRequired,
    username:  PropTypes.string
  };

  handleSignOut = () => {
    window.sessionStorage.removeItem('token');
    this.props.dispatch(SessionActions.close());
  };

  render() {
    const appearLoggedIn = {
      display: this.props.legit ? 'inline-block' : 'none'
    };

    const appearLoggedOut = {
      display: !this.props.legit ? 'inline-block' : 'none'
    };

    const logoSrc = this.props.nightMode ? 'chapters-logo-night' : 'chapters-logo';

    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
            <div className="logo">
              <Link to="/home"><img src={`/assets/${logoSrc}.svg`} width="175em"/></Link>
            </div>

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
                    Signed in as <Link to={'/users/' + this.props.username}>{this.props.username}</Link>
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

function mapStateToProps(state) {
  return {
    legit:    state.session.get('legit'),
    username: state.session.get('name'),
    nightMode: state.session.get('nightMode')
  }
};

export default connect(mapStateToProps)(Navbar);

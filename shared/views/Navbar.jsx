import React    from 'react';
import { Link } from 'react-router';
import { connect }          from 'react-redux';

@connect(state => ({
  legit:    state.session.get('legit'),
  username: state.session.get('name')
}))

export default class Navbar extends React.Component {
  render() {
    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <h2 className="logo">
            <Link to="/home">Chapters</Link>
          </h2>
            <a href="javascript:void(0)" className="navigation-menu-button" id="js-mobile-menu">MENU</a>
            <div className="navigation-tools">

              <nav className="right" role="navigation" style={ { display: this.props.legit ? 'none' : 'inline-block' } }>
                <ul>
                  <li className="nav-link"><Link to="/login"><button className="btn">Login</button></Link></li>
                  <li className="nav-link"><Link to="/register"><button className="btn">Sign up</button></Link></li>
                </ul>
              </nav>

              <span className="right placeholder" style={ { display: this.props.legit ? 'inline-block' : 'none' } }>
                Signed in as {this.props.username}
              </span>
            </div>
          </div>
        </header>
    );
  }
}

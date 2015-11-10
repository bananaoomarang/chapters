import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import classSet             from 'classnames';
import Navbar               from 'components/Navbar';
import * as SessionActions  from 'actions/SessionActions';

@connect(state => ({
  legit:     state.session.get('legit'),
  loading:   state.session.get('loading'),
  nightMode: state.session.get('nightMode')
}))

export default class MainView extends React.Component {
  static propTypes = {
    dispatch:  PropTypes.func.isRequired,
    legit:     PropTypes.bool.isRequired,
    loading:   PropTypes.bool.isRequired,
    nightMode: PropTypes.bool.isRequired,
    children:  PropTypes.object
  }

  setNightMode = (bool) => {
    if(bool)
      document.body.className += 'night-mode';
    else
      document.body.className = document.body.className.replace('night-mode', '');
  }

  componentDidMount() {
    const storedToken = window.sessionStorage.getItem('token');

    if(storedToken)
        this.props.dispatch(SessionActions.validate(storedToken));

    this.setNightMode(this.props.nightMode);
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.nightMode !== this.props.nightMode) {
      this.setNightMode(nextProps.nightMode);
    }
  }

  render() {
    const Loader = (
      <div className="loader">
        <div id="blot1" className="blot" />
        <div id="blot2" className="blot" />
        <div id="blot3" className="blot" />
      </div>
    );

    const childrenClasses = classSet({
      invisible: this.props.loading
    });

    return (
      <div id="main-view">

        <Navbar />

        <hr/>
        {
          (() => {
            return this.props.loading ? Loader : undefined
          })()
        }

        <div className={childrenClasses} >
          {this.props.children}
        </div>

        <script src="/assets/bundle.js" />
      </div>
    );
  }
}

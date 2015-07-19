import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import Navbar               from 'views/Navbar';
import * as SessionActions  from 'actions/SessionActions';

@connect(state => ({
  legit:   state.session.get('legit'),
  loading: state.session.get('loading')
}))

export default class MainView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    legit:    PropTypes.bool.isRequired,
    loading:  PropTypes.bool.isRequired
  }

  componentDidMount() {
    const storedToken = window.sessionStorage.getItem('token');

    if(storedToken) this.props.dispatch(SessionActions.validate(storedToken));
  }

  render() {
    const children = this.props.loading ? <div className="loader" /> : this.props.children;

    return (
      <div id="main-view">

        <Navbar />

        <hr/>

        {children}

        <link href='http://fonts.googleapis.com/css?family=Crimson+Text:400,400italic,700,700italic' rel='stylesheet' type='text/css' />
        <script type="application/javascript" src="/assets/bundle.js" />
      </div>
    );

  }

}

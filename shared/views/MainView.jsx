import React          from 'react';
import { RouteHandler } from 'react-router';
import { Link }       from 'react-router';
import SessionActions from 'actions/SessionActions';

var MainView = {

  contextTypes: {
    flux:   React.PropTypes.object.isRequired,
    router: React.PropTypes.func
  },

  getInitialState: function () {
    if(typeof window !== 'undefined') {
      var storedToken = window.sessionStorage.getItem('token');
    }

    if(storedToken) SessionActions.validate(storedToken);

    return this.context.flux
      .getStore('session')
      .getState();
  },

  _onChange: function () {

    let { legit } = this.context.flux
      .getStore('session').getState();

    if(legit) this.context.router.transitionTo('/editor');

    this.setState(SessionStore.getState());

  },

  render: function () {

    return (
      <div id="main-view">
        <h1>
          <Link to="home">Chapters</Link>
        </h1>

        <hr/>

        <RouteHandler />

        <link href='http://fonts.googleapis.com/css?family=Crimson+Text:400,400italic,700,700italic' rel='stylesheet' type='text/css' />
        <script type="application/javascript" src="/bundle.js" />

      </div>
    );

  }

};

module.exports = React.createClass(MainView);

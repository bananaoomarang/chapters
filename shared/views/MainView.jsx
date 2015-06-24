'use strict';

import React          from 'react';
import Router         from 'react-router';
import { Link }       from 'react-router';
import FluxyMixin     from 'alt/mixins/FluxyMixin';
import SessionStore   from '../stores/SessionStore';
import SessionActions from '../actions/SessionActions';

var RouteHandler = Router.RouteHandler;

var MainView = {

  mixins: [FluxyMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    storeListeners: {
      _onChange: SessionStore
    }
  },

  getInitialState: function () {
    if(typeof window !== 'undefined') {
      var storedToken = window.sessionStorage.getItem('token');
    }

    if(storedToken) SessionActions.validate(storedToken);

    return SessionStore.getState();
  },

  _onChange: function () {

    let { legit } = SessionStore.getState();

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

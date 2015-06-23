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

    let { token } = SessionStore.getState();

    if(token) this.context.router.transitionTo('/editor');

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

        <script type="application/javascript" src="/bundle.js"></script>
      </div>
    );

  }

};

module.exports = React.createClass(MainView);

'use strict';

var React        = require('react');
var Editor       = require('./Editor');
var Login        = require('./Login');
var SessionStore = require('./stores/SessionStore');

var BaseView = React.createClass({

  getInitialState: function () {
    return { 
      user: null,
      token: null
    }
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this.onSessionChange);
  },

  onSessionChange: function () {
    this.setState({
      user: SessionStore.getUser(),
      token: SessionStore.getToken()
    });
  },

  render: function () {
    return (
      <div className="mainView">
        <Editor token={this.state.token} />
        <div id="login">
          <Login signedIn={this.state.user}/>
        </div>
      </div>
    );
  }

});

React.render(
  <BaseView />,
  document.getElementById('editor')
);


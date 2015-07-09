import React                  from 'react';
import ifdefBrowser           from 'lib/ifdefBrowser';
import { connect }            from 'redux/react';
import { RouteHandler, Link } from 'react-router';
import * as SessionActions    from 'actions/SessionActions';

@connect(state => ({
  session: state.session
}))
export default class MainView extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    ifdefBrowser(() => {
      const storedToken = window.sessionStorage.getItem('token');

      if(storedToken) SessionActions.validate(storedToken);
    });
  }

  render() {

    if(this.props.legit)
      this.context.router.transitionTo('/editor');

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

}

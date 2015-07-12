import React               from 'react';
import ifdefBrowser        from 'lib/ifdefBrowser';
import { connect }         from 'redux/react';
import { Link }            from 'react-router';
import * as SessionActions from 'actions/SessionActions';

@connect(state => {
  return {
    legit: state.session.get('legit')
  }
})

export default class MainView extends React.Component {
  static contextTypes = {
    redux:  React.PropTypes.object.isRequired
  }

  static propTypes = {
    legit: React.PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    ifdefBrowser(() => {
      const storedToken = window.sessionStorage.getItem('token');

      if(storedToken) SessionActions.validate(storedToken)(props.dispatch);
    });
  }

  render() {
    return (
      <div id="main-view">
        <h1>
          <Link to="home">Chapters</Link>
        </h1>

        <hr/>

        {this.props.children}

        <link href='http://fonts.googleapis.com/css?family=Crimson+Text:400,400italic,700,700italic' rel='stylesheet' type='text/css' />
        <script type="application/javascript" src="/assets/bundle.js" />
      </div>
    );

  }

}

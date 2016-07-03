import React, { PropTypes } from 'react';
import { List }             from 'immutable';
import { Link }             from 'react-router';

export default class Breadcrumbs extends React.Component {
  static propTypes = {
    crumbs: PropTypes.instanceOf(List).isRequired
  };

  static contextTypes = {
  };

  render() {
    const crumbs = this.props.crumbs.map((crumb, index) => {
      return (
        <Link to={['/chapters', crumb.id].join('/')} key={index}>
          <span className="crumb">{crumb.get('title')}</span>
        </Link>
      )
    });

    return (
      <div id="chapter-breadcrumbs" className="breadcrumbs">
        {crumbs.toJS()}
      </div>
    );
  }
}

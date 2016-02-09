import React, { PropTypes } from 'react';
import classSet             from 'classnames';

export default class Collapsable extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  };

  render () {
    const classes = classSet({
      hidden: this.props.collapsed
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

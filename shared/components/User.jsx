import React, { PropTypes } from 'react';
import CardsView            from 'components/CardsView';
import capitalize           from 'lib/capitalize';

export default class User extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired
  }

  render() {
    const cards = [
      {
        body: 'Stories'
      }
    ];

    return (
      <CardsView items={cards} header={capitalize(this.props.routeParams.user)} />
    );
  }
}

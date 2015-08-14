import React    from 'react';
import ListView from 'components/ListView';

export default class Section extends React.Component {
  static elementFixture = [
    { title: 'Title', description: 'Super snappy description' }
  ]

  render() {
    return <ListView elements={this.elementFixture} />
  }
}

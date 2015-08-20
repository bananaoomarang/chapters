import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import ListView             from 'components/ListView';
import capitalize           from 'lib/capitalize';
import * as SectionActions  from 'actions/SectionActions';

@connect(state => ({
  section: state.section.get('section')
}))

export default class Section extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    section: PropTypes.object.isRequired
  }

  static needs = [
    SectionActions.getSection
  ]

  render() {
    const chapters = this.props.section.get('chapters').toJS()
      .map(chapter => {
          return {
            title:       chapter.title,
            separator:   'Or',
            description: chapter.description,
            adendum:     'By ' + capitalize(chapter.author),
            href:   '/stories/' + [this.props.routeParams.id, this.props.routeParams.section, chapter.id].join('/')
          };
      })
      .concat([
        {
          title: 'New Chapter',
          href:  '/stories/' + [this.props.routeParams.id, this.props.routeParams.section, 'new'].join('/')
        }
      ]);

    return <ListView elements={chapters} header={this.props.section.id}/>;
  }
}

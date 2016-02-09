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
    dispatch:    PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    section:     PropTypes.object.isRequired
  };

  static needs = [
    SectionActions.getSection
  ];

  onReorder = (index, insertAt) => {
    const newChapters = this.props.section
      .get('chapters')
      .delete(index)
      .splice(insertAt, 0, this.props.section.getIn(['chapters', index]));

    const newSection = this.props.section.setIn(['chapters'], newChapters);

    this.props.dispatch(
      SectionActions.setSection(newSection)
    );
  };

  handleSave = () => {
    this.props.dispatch(
      SectionActions.patchSection(this.props.section.toJS(), this.props.routeParams)
    );
  };

  render() {
    const chapters = this.props.section
      .get('chapters')
      .map(chapter => {
        return {
          title:       chapter.get('title'),
          separator:   '&nbsp;',
          description: chapter.get('description'),
          adendum:     'By ' + capitalize(chapter.get('author')),
          href:        '/stories/' + [this.props.routeParams.id, this.props.routeParams.section, chapter.get('id')].join('/')
        };
      });

      return (
        <ListView
          elements={chapters}
          header={this.props.section.get('title')}
          editable={this.props.section.get('write')}
          onReorder={this.onReorder}
          handleSave={this.handleSave} />
      );
  }
}

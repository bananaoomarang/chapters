import React            from 'react';
import StoryActions     from 'actions/StoryActions';
import ParagraphActions from 'actions/ParagraphActions';

var FontSizeSelector = {

  propTypes: {
    defaultSize: React.PropTypes.number
  },

  getInitialState () {
    return {
      value: this.props.defaultSize || 24
    };
  },

  componentDidMount () {
    var font = {
      size: this.state.value
    };

    ParagraphActions.setFont(font);

    StoryActions.populateStories();
  },

  handleChange (event) {
    var font = {
      size: event.target.value
    };

    ParagraphActions.setFont(font);

    this.setState({
      value: event.target.value
    });
  },

  render () {

    return (
      <input type="number" value={this.state.value} onChange={this.handleChange} ></input>
    );

  }

};

module.exports = React.createClass(FontSizeSelector);

import React            from 'react';
import FontSizeSelector from './FontSizeSelector';
import EditorActions    from '../../actions/EditorActions';
import ParagraphActions from '../../actions/ParagraphActions';

var Toolbar = {
  handleAlignment: function (event) {
    ParagraphActions.setAlignment(event.target.name);
  },

  handleLoad: function () {
    EditorActions.populateStories();
    EditorActions.setLoading(true);
  },

  render: function () {
    return (
      <div className="toolbar">
        <FontSizeSelector defaultSize={this.props.defaultFont.size} />

        <br />

        <button className="btn" name="left"   onClick={this.handleAlignment} >Left</button>
        <button className="btn" name="center" onClick={this.handleAlignment} >Center</button>
        <button className="btn" name="right"  onClick={this.handleAlignment} >Right</button>

        <br />

        <button className="btn" name="load"   onClick={this.handleLoad}      >Load</button>
        <button className="btn" name="save"   onClick={this.props.handleSave}>Save</button>

      </div>
    );
  }
};

module.exports = React.createClass(Toolbar);

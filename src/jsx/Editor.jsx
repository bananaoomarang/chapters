var React     = require('react');
var kbjs      = require('keyboardjs');
var Paragraph = require('./Paragraph');

var Editor = {
  getInitialState: function () {
    return { 
      paragraphs: [<Paragraph id="0" />] 
    }
  },

  handleFocusChange: function (event) {
    this.setState({ focusedParagraph: event.target });
  },

  bindKeys: function () {
    kbjs.on('enter', function enterDown (e) {

      var currentIndex       = Number(this.state.focusedParagraph.dataset.index);
      var newParagraphId     = this.state.paragraphs.length;
      var newParagraph       = <Paragraph id={newParagraphId} />
      var newParagraphsArray = this.state.paragraphs.slice();

      // Stop event bubbling
      e.preventDefault();
      e.stopPropagation();

      // Splice new paragraph
      newParagraphsArray.splice(currentIndex + 1, 0, newParagraph);

      this.setState({
        paragraphs: newParagraphsArray
      });

      // Focus said paragraph
      this.refs[newParagraphId].getDOMNode().focus();

    }.bind(this));
  },

  componentDidMount: function () {
    this.bindKeys();
  },

  render: function () {
    return (
      <div>
        {
          this.state.paragraphs.map(function(p, index) {
            return <Paragraph key={p.props.id} ref={p.props.id} index={index} onFocus={this.handleFocusChange} />;
          }.bind(this))
        }
      </div>
    );
  }
};

module.exports = React.createClass(Editor);

var React     = require('react');
var kbjs      = require('keyboardjs');
var rangy     = require('rangy');
var Paragraph = require('./Paragraph');
var Toolbar = require('./Toolbar');

var Editor = {
  getInitialState: function () {
    return { 
      paragraphs: [<Paragraph id="0" />] 
    }
  },

  handleFocus: function (event) {
    this.setState({ focusedParagraph: event.target });
  },

  handleBlur: function (event) {
    this.setState({ focusedParagraph: null });
  },

  getCaret: function (element) {
    var range     = rangy.getSelection(element);

    return {
      position : range.anchorOffset,
      selection: range.focusOffset
    };
  },

  bindKeys: function () {
    kbjs.on('enter', function onEnter (e) {

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

    kbjs.on('backspace', function onBackspace (e) {
      var currentParagraph   = this.state.focusedParagraph;
      var currentIndex       = Number(currentParagraph.dataset.index);
      var previousParagraph  = currentParagraph.previousSibling;
      var caret              = this.getCaret(currentParagraph);
      var newParagraphsArray = this.state.paragraphs.slice();

      if(!currentParagraph) return;

      if (caret.position === 0 && previousParagraph.tagName !== 'DIV') {

        newParagraphsArray.splice(currentIndex, 1);

        this.setState({
          paragraphs: newParagraphsArray
        });

        previousParagraph.focus();

        // Stop event bubbling
        e.preventDefault();
        e.stopPropagation();
        
      }

    }.bind(this));

    kbjs.on('up', function onUp (e) {
      var currentParagraph   = this.state.focusedParagraph;
      var previousParagraph  = currentParagraph.previousSibling;

      if(!currentParagraph) return;

      if (previousParagraph) previousParagraph.focus();

    }.bind(this));

    kbjs.on('down', function onDown (e) {
      var currentParagraph   = this.state.focusedParagraph;
      var nextParagraph  = currentParagraph.nextSibling;

      if(!currentParagraph) return;

      if (nextParagraph) nextParagraph.focus();

    }.bind(this));
  },

  componentDidMount: function () {
    this.bindKeys();
  },

  render: function () {
    return (
      <div>
        <Toolbar />
        {
          this.state.paragraphs.map(function(p, index) {
            return <Paragraph key={p.props.id} ref={p.props.id} index={index} onFocus={this.handleFocus} onBlur={this.handleBlur}/>;
          }.bind(this))
        }
      </div>
    );
  }
};

module.exports = React.createClass(Editor);

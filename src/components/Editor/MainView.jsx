'use strict';

var React            = require('react');
var kbjs             = require('keyboardjs');
var Paragraph        = require('./Paragraph');
var ParagraphStore   = require('../stores/ParagraphStore');
var ParagraphActions = require('../actions/ParagraphActions');
var getCaret         = require('../lib/getCaret');

var EditorTitle = {
  getInitialState: function () {
    return {
      paragraphs:       ParagraphStore.getParagraphs(),
      font:             ParagraphStore.getFont(),
      alignment:        ParagraphStore.getAlignment(),
      focusedParagraph: null
    };
  },

  onStoreChange: function () {
    this.setState({
      paragraphs: ParagraphStore.getParagraphs(),
      font:       ParagraphStore.getFont(),
      alignment:  ParagraphStore.getAlignment()
    });
  },

  handleFocus: function (event) {
    if(event.target.tagName === 'P') {

      this.setState({ focusedParagraph: event.target });

    } else {

      this.setState({ focusedParagraph: null });

    }
  },

  handleBlur: function () {
    this.setState({ focusedParagraph: null });
  },

  bindKeys: function () {
    kbjs.on('enter', function onEnter (e) {

      // Stop event bubbling
      e.preventDefault();
      e.stopPropagation();

      var currentParagraph   = this.state.focusedParagraph;

      if(!currentParagraph) return;

      var caret              = getCaret(currentParagraph);
      var currentIndex       = Number(currentParagraph.dataset.index);
      var currentHTML        = currentParagraph.innerHTML;
      var newParagraphId     = this.state.paragraphs.length;
      var newParagraph       = <Paragraph id={newParagraphId} />;
      var newParagraphDOM    = null;
      var newParagraphsArray = this.state.paragraphs.slice();


      // Splice new paragraph
      newParagraphsArray.splice(currentIndex + 1, 0, newParagraph);

      this.setState({
        paragraphs: newParagraphsArray
      });

      newParagraphDOM    = this.refs[newParagraphId].getDOMNode();

      newParagraphDOM.focus();

      newParagraphDOM.innerHTML += currentHTML.slice(caret.position, currentHTML.length);
      currentParagraph.innerHTML = currentHTML.slice(0, caret.position);


    }.bind(this));

    kbjs.on('backspace', function onBackspace (e) {

      var currentParagraph   = this.state.focusedParagraph;

      if(!currentParagraph) return;

      var currentHTML        = currentParagraph.innerHTML;
      var currentIndex       = Number(currentParagraph.dataset.index);
      var previousParagraph  = currentParagraph.previousSibling;
      var caret              = getCaret(currentParagraph);
      var newParagraphsArray = this.state.paragraphs.slice();

      if(!currentParagraph) return;

      if (caret.position === 0 && previousParagraph.tagName !== 'DIV') {


        // Remove paragraph
        newParagraphsArray.splice(currentIndex, 1);

        this.setState({
          paragraphs: newParagraphsArray
        });

        if(previousParagraph.innerHTML.length) {

          getCaret(previousParagraph)
            .setPosition('end');

        } else if (previousParagraph) {

          previousParagraph.focus();

        }

        previousParagraph.innerHTML += currentHTML;

        // Stop event bubbling
        e.preventDefault();
        e.stopPropagation();

      }

    }.bind(this));

    kbjs.on('up', function onUp () {

      var currentParagraph   = this.state.focusedParagraph;

      if(!currentParagraph) return;

      var previousParagraph  = currentParagraph.previousSibling;

      if(!currentParagraph) return;

      if (previousParagraph) previousParagraph.focus();

    }.bind(this));

    kbjs.on('down', function onDown () {

      var currentParagraph   = this.state.focusedParagraph;

      if(!currentParagraph) return;

      var nextParagraph  = currentParagraph.nextSibling;

      if(!currentParagraph) return;

      if (nextParagraph) nextParagraph.focus();

    }.bind(this));
  },

  componentDidMount: function () {
    this.bindKeys();
    ParagraphStore.addChangeListener(this.onStoreChange);

    ParagraphActions.setFont(this.props.defaultFont);
    ParagraphActions.setAlignment(this.props.defaultAlignment);
    ParagraphActions.setParagraphs('<p id="0"></p>');
  },

  render: function () {

    var style = {
      fontSize:  this.state.font.size,
      textAlign: this.state.alignment
    };

    return (
      <div className="paragraphs" id="paragraph-container" style={style}>
        {
          this.state.paragraphs.map(function(p, index) {
            return <Paragraph key={index} ref={index} index={index} onFocus={this.handleFocus} onBlur={this.handleBlur} text={p.innerText} />;
          }.bind(this))
        }
      </div>
    );
  }
};

module.exports = React.createClass(EditorTitle);

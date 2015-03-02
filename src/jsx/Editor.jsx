'use strict';

var React     = require('react');
var kbjs      = require('keyboardjs');
var rangy     = require('rangy');
var Dropzone  = require('dropzone');
var Paragraph = require('./Paragraph');
var Toolbar   = require('./Toolbar');

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

    var currentHTML      = element.innerHTML;
    var range            = rangy.createRange();
    var elementSelection = rangy.getSelection(element);
    var windowSelection  = rangy.getSelection();
    var node             = element.childNodes[0];

    return {
      position    : elementSelection.anchorOffset,

      selection   : elementSelection.focusOffset,

      setPosition : function (newPosition) {

        setTimeout( function delayCaretMove () {

          switch(newPosition) {
            case 'start':
              range.setStart(node, 0);

              break;

            case 'end':
              range.setStart(node, currentHTML.length);

              break;

            default:
              range.setStart(node, newPosition);

              break;
          }

          range.collapse(true);

          windowSelection.setSingleRange(range);

        });

      },

    };
  },

  bindKeys: function () {
    kbjs.on('enter', function onEnter (e) {

      var currentParagraph   = this.state.focusedParagraph;
      var caret              = this.getCaret(currentParagraph);
      var currentIndex       = Number(currentParagraph.dataset.index);
      var currentHTML        = currentParagraph.innerHTML;
      var newParagraphId     = this.state.paragraphs.length;
      var newParagraph       = <Paragraph id={newParagraphId} />
      var newParagraphDOM    = null;
      var newParagraphsArray = this.state.paragraphs.slice();

      // Stop event bubbling
      e.preventDefault();
     e.stopPropagation();

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
      var currentHTML        = currentParagraph.innerHTML;
      var currentIndex       = Number(currentParagraph.dataset.index);
      var previousParagraph  = currentParagraph.previousSibling;
      var caret              = this.getCaret(currentParagraph);
      var newParagraphsArray = this.state.paragraphs.slice();

      if(!currentParagraph) return;

      if (caret.position === 0 && previousParagraph.tagName !== 'DIV') {

        // Remove paragraph
        newParagraphsArray.splice(currentIndex, 1);

        this.setState({
          paragraphs: newParagraphsArray
        });

        if(previousParagraph.innerHTML.length) {

          this.getCaret(previousParagraph)
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

    kbjs.on('up', function onUp (e) {

      var currentParagraph   = this.state.focusedParagraph;
      var caret              = this.getCaret(currentParagraph);
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

    var dropzone = new Dropzone('div#editor', { url: '/story/upload' });
  },

  render: function () {
    return (
      <div>
        <Toolbar />

        <div className="paragraphs">
          {
            this.state.paragraphs.map(function(p, index) {
              return <Paragraph key={p.props.id} ref={p.props.id} index={index} onFocus={this.handleFocus} onBlur={this.handleBlur} />;
            }.bind(this))
          }
        </div>
      </div>
    );
  }
};

module.exports = React.createClass(Editor);

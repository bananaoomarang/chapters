'use strict';

var React     = require('react');
var kbjs      = require('keyboardjs');
var request   = require('superagent');
var rangy     = require('rangy');
var Dropzone  = require('dropzone');
var Paragraph = require('./Paragraph');
var Toolbar   = require('./Toolbar');
var EditorStore = require('./stores/EditorStore');

var Editor = {
  onEditorChange: function () {
    this.setState({
      font: EditorStore.getFont()
    });
  },

  getInitialState: function () {
    return { 
      paragraphs: [React.createElement(Paragraph, {id: "0"})],
      font: {
        size: null
      }
    }
  },

  handleFocus: function (event) {
    this.setState({ focusedParagraph: event.target });
  },

  handleBlur: function (event) {
    this.setState({ focusedParagraph: null });
  },

  handleSave: function (event) {
    var payload = {
      title: 'UserCreated',
      text: this.exportText()
    };

    request
      .post('/story/upload')
      .send(payload)
      .set('Authorization', 'Bearer ' + this.props.token)
      .end(function (err, res) {
        if (err) return console.error(err);

        console.log('Save successful');
      });
  },

  // Concatanate html tags into one string for exporting
  exportText: function () {
    var div    = document.getElementById('paragraph-container');
    var string = '';

    if(div.hasChildNodes()) {

      for (var child in div.childNodes) {
        var p    = div.childNodes[child];
        var text = p.innerText; 

        if(text) string += text + '\n\n';
      }
    }

    return string;
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
      var newParagraph       = React.createElement(Paragraph, {id: newParagraphId})
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
    EditorStore.addChangeListener(this.onEditorChange);

    this.bindKeys();

    var dropzoneOpts = {
      url: '/story/upload',
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    };

    var dropzone  = new Dropzone('body', dropzoneOpts);

    dropzone.on('sending', function(file, xhr, formData) {
      formData.append('filename', file.name);
    });
  },

  render: function () {

    var style = {
      fontSize: this.state.font.size
    };

    return (
      React.createElement("div", null, 
        React.createElement(Toolbar, {token: this.props.token, handleSave: this.handleSave}), 

        React.createElement("div", {className: "paragraphs", id: "paragraph-container", style: style}, 
          
            this.state.paragraphs.map(function(p, index) {
              return React.createElement(Paragraph, {key: p.props.id, ref: p.props.id, index: index, onFocus: this.handleFocus, onBlur: this.handleBlur});
            }.bind(this))
          
        )
      )
    );
  }
};

module.exports = React.createClass(Editor);

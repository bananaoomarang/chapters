'use strict';

var React         = require('react');
var kbjs          = require('keyboardjs');
var request       = require('superagent');
var rangy         = require('rangy');
var Dropzone      = require('dropzone');
var Paragraph     = require('./Paragraph');
var Toolbar       = require('./Toolbar');
var StorySelector = require('./StorySelector');
var EditorStore   = require('./stores/EditorStore');
var EditorActions = require('./actions/EditorActions');

var Editor = {

  getInitialState: function () {
    return {
      paragraphs:      [<Paragraph id="0" />],
      story:           EditorStore.getStory(),
      editableStories: EditorStore.getEditableStories(),
      font:            EditorStore.getFont(),
      alignment:       EditorStore.getAlignment(),
      loadDialogue:    EditorStore.getIsLoading()
    };
  },

  onEditorChange: function () {
    var previousStory = this.state.story;
    var newStory      = EditorStore.getStory();

    if(previousStory.text !== newStory.text) {
      console.log(newStory.text);
    }

    this.setState({
      story:           EditorStore.getStory(),
      editableStories: EditorStore.getEditableStories(),
      font:            EditorStore.getFont(),
      alignment:       EditorStore.getAlignment(),
      loadDialogue:    EditorStore.getIsLoading()
    });
  },

  handleTitleChange: function () {
    var title = document.getElementById('title');

    EditorActions.setStory({
      title: title.innerText
    });

  },

  handleFocus: function (event) {
    if(event.target.tagName === 'P') this.setState({ focusedParagraph: event.target });
    else this.setState({ focusedParagraph: null });
  },

  handleBlur: function () {
    this.setState({ focusedParagraph: null });
  },

  handleSave: function () {
    var sessionToken = window.sessionStorage.getItem('token');

    var payload = {
      title: this.state.story.title,
      text:  this.exportText()
    };

    request
      .post('/story/upload')
      .send(payload)
      .set('Authorization', 'Bearer ' + sessionToken)
      .end(function (err) {
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
      position:  elementSelection.anchorOffset,
      selection: elementSelection.focusOffset,

      setPosition: function (newPosition) {

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

      }

    };
  },

  bindKeys: function () {
    kbjs.on('enter', function onEnter (e) {

      // Stop event bubbling
      e.preventDefault();
      e.stopPropagation();

      var currentParagraph   = this.state.focusedParagraph;

      if(!currentParagraph) return;

      var caret              = this.getCaret(currentParagraph);
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
    var sessionToken = window.sessionStorage.getItem('token');

    EditorStore.addChangeListener(this.onEditorChange);

    this.bindKeys();

    var dropzoneOpts = {
      url:     '/story/upload',
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    var dropzone  = new Dropzone('body', dropzoneOpts);

    dropzone.on('sending', function(file, xhr, formData) {
      formData.append('filename', file.name);
    });
  },

  render: function () {

    var style = {
      fontSize:  this.state.font.size,
      textAlign: this.state.alignment
    };

    var storySelectorStyle = {
      visibility: this.state.loadDialogue ? 'visible' : 'hidden',
      opacity:    this.state.loadDialogue ? 1 : 0
    };

    return (
      <div>
        <Toolbar handleSave={this.handleSave} />

        <h1 id="title" contentEditable="true" onInput={this.handleTitleChange}>{this.state.story.title}</h1>

        <hr />

        <div className="paragraphs" id="paragraph-container" style={style}>
          {
            this.state.paragraphs.map(function(p, index) {
              return <Paragraph key={p.props.id} ref={p.props.id} index={index} onFocus={this.handleFocus} onBlur={this.handleBlur} />;
            }.bind(this))
          }
        </div>

        <div className="story-render hidden" dangerouslySetInnerHTML={ {__html: this.state.story.text} }></div>

        <StorySelector style={storySelectorStyle} storyList={this.state.editableStories} />
      </div>
    );
  }
};

module.exports = React.createClass(Editor);
// TODO Just realised we're still doing a bunch of state setting logic that should be store-ified...
import React, { PropTypes } from 'react';
import { connect }          from 'redux/react';
import getCaret             from 'lib/getCaret';
import ifdefBrowser         from 'lib/ifdefBrowser';
import * as StoryActions    from 'actions/StoryActions';

var kbjs = ifdefBrowser( () => {
  return require('keyboardjs');
});

@connect(state => {
  return {
    editing:          state.story.get('editing'),
    focusedParagraph: state.story.getIn(['story', 'focusedParagraph'])
  };
})

export default class ParagraphView extends React.Component {
  static propTypes = {
    dispatch:         PropTypes.func.isRequired,
    editing:          PropTypes.bool.isRequired,
    focusedParagraph: PropTypes.number
  }

  handleFocus = (e) => {
    if(e.target.tagName === 'P') {

      this.props.dispatch(StoryActions.setFocusedParagraph(e.target.dataset.index));

    } else {

      this.props.dispatch(StoryActions.setFocusedParagraph(-1));

    }
  }

  bindKeys = () => {
    kbjs.on('enter', (e) => {

      // Stop event bubbling
      e.preventDefault();
      e.stopPropagation();

      var currentParagraph   = this.refs[this.props.focusedParagraph];

      if(!currentParagraph) return;

      var caret              = getCaret(currentParagraph);
      var currentIndex       = Number(currentParagraph.dataset.index);
      var currentHTML        = currentParagraph.innerHTML;
      var newParagraph       = '';
      var newParagraphDOM    = null;
      var newParagraphsArray = this.state.paragraphs.slice();

      // Splice new paragraph
      newParagraphsArray.splice(currentIndex + 1, 0, newParagraph);

      newParagraphsArray[currentIndex + 1]  = currentHTML.slice(caret.position, currentHTML.length);
      newParagraphsArray[currentIndex]      = currentHTML.slice(0, caret.position);

      this.setState({
        paragraphs: newParagraphsArray
      }, function () {

        newParagraphDOM = this.refs[currentIndex + 1].getDOMNode();

        newParagraphDOM.focus();


      });

    });

    kbjs.on('backspace', (e) => {

      var currentParagraph   = this.refs[this.props.focusedParagraph];

      if(!currentParagraph) return;

      var currentHTML        = currentParagraph.innerHTML;
      var currentIndex       = Number(currentParagraph.dataset.index);
      var previousParagraph  = currentParagraph.previousSibling;
      var caret              = getCaret(currentParagraph);
      var newParagraphsArray = this.state.paragraphs.slice();

      if(!currentParagraph) return;

      if (caret.position === 0 && previousParagraph.tagName !== 'DIV') {

        // Stop event bubbling
        e.preventDefault();
        e.stopPropagation();

        // Remove paragraph
        newParagraphsArray.splice(currentIndex, 1);

        var caretPosition = newParagraphsArray[currentIndex - 1].length;

        newParagraphsArray[currentIndex - 1] += currentHTML;

        this.setState({
          paragraphs: newParagraphsArray
        });

        if(previousParagraph.innerHTML.length) {

          getCaret(previousParagraph)
            .setPosition(caretPosition);

        } else if (previousParagraph) {

          previousParagraph.focus();

        }

      }

    });

    kbjs.on('up', () => {

      var currentParagraph   = this.refs[this.props.focusedParagraph];

      if(!currentParagraph) return;

      var previousParagraph  = currentParagraph.previousSibling;

      if(!currentParagraph) return;

      if (previousParagraph) previousParagraph.focus();

    });

    kbjs.on('down', () => {

      var currentParagraph   = this.refs[this.props.focusedParagraph];

      if(!currentParagraph) return;

      var nextParagraph  = currentParagraph.nextSibling;

      if(!currentParagraph) return;

      if (nextParagraph) nextParagraph.focus();

    });
  }

  componentDidMount = () => {
    if(kbjs) this.bindKeys();
  }

  render() {
    return (
      <div className="paragraphs" id="paragraph-container">
        {
          this.props.paragraphs.map( (p, index) => {
            const style = {
              fontSize:  p.font.size,
              textAlign: p.alignment
            };

            return <p key={index} ref={index} data-index={index} style={style} onFocus={this.handleFocus} onBlur={this.handleBlur} contentEditable={this.props.editing}>{p.text}</p>;
          })
        }
      </div>
    );
  }
}

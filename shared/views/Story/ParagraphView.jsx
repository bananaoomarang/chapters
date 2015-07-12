import React        from 'react';
import { connect }  from 'redux/react';
import getCaret     from 'lib/getCaret';
import ifdefBrowser from 'lib/ifdefBrowser';

var kbjs = ifdefBrowser( () => {
  return require('keyboardjs');
});

@connect(state => ({
  editing: state.story.get('editing')
}))

export default class ParagraphView extends React.Component {
  state = {
    focusedParagraph: null
  }

  handleFocus = (e) => {
    if(e.target.tagName === 'P') {

      this.setState({ focusedParagraph: e.target });

    } else {

      this.setState({ focusedParagraph: null });

    }
  }

  handleBlur = () => {
    this.setState({ focusedParagraph: null });
  }

  bindKeys = () => {
    kbjs.on('enter', (e) => {

      // Stop event bubbling
      e.preventDefault();
      e.stopPropagation();

      var currentParagraph   = this.state.focusedParagraph;

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

      var currentParagraph   = this.state.focusedParagraph;

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

      var currentParagraph   = this.state.focusedParagraph;

      if(!currentParagraph) return;

      var previousParagraph  = currentParagraph.previousSibling;

      if(!currentParagraph) return;

      if (previousParagraph) previousParagraph.focus();

    });

    kbjs.on('down', () => {

      var currentParagraph   = this.state.focusedParagraph;

      if(!currentParagraph) return;

      var nextParagraph  = currentParagraph.nextSibling;

      if(!currentParagraph) return;

      if (nextParagraph) nextParagraph.focus();

    });
  }
  

  componentDidMount = () => {
    if(kbjs) this.bindKeys();
  }

  componentWillUpdate = (nextProps) => {

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

            return <p key={index} ref={index} index={index} style={style} onFocus={this.handleFocus} onBlur={this.handleBlur} contentEditable={this.props.editing}>{p.text}</p>;
          })
        }
      </div>
    );
  }
}

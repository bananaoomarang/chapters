import React                 from 'react';
import { connect }           from 'redux/react';
import * as ParagraphActions from 'actions/ParagraphActions';
import * as StoryActions     from 'actions/StoryActions';
import getCaret              from 'lib/getCaret';
import ifdefBrowser          from 'lib/ifdefBrowser';
import Paragraph             from './Paragraph';

var kbjs = ifdefBrowser( () => {
  return require('keyboardjs');
});

@connect(state => ({
  html:       state.story.get('story').html,
  paragraphs: state.story.get('story').paragraphs
}))

export default class ParagraphView extends React.Component {
  state = {
    focusedParagraph: null
  }

  constructor (props) {
    super(props);

    ifdefBrowser( () => {
      props.dispatch(ParagraphActions.setFont(props.defaultFont));
      props.dispatch(ParagraphActions.setAlignment(props.defaultAlignment));
    });
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

  componentDidUpdate = (nextProps) => {
    function toArray(nl) {
          for(var a=[], l=nl.length; l--; a[l]=nl[l]);
              return a;

    }

    if(nextProps.html !== this.props.html) {
      const paragraphs =
        toArray(
        this.refs.paragraphRenderer
          .getDOMNode()
          .children
          )
          .filter( ({ nodeName }) => nodeName !== '#text')
          .map(p => ({
            text:      p.textContent,
            alignment: 'center',
            font:      {
              size: 24
            }
          }));

      this.props.dispatch(
        StoryActions.setStory({ paragraphs })
      );
    }

  }

  render() {

    console.log(this.props);

    return (
      <div className="paragraphs" id="paragraph-container">
        {() =>
          this.props.paragraphs.map( (p, index) => {
            const style = {
              fontSize:  this.props.font.size,
              textAlign: this.props.alignment
            };

            return <Paragraph key={index} ref={index} index={index} style={style} onFocus={this.handleFocus} onBlur={this.handleBlur} text={p.text}></Paragraph>;
          })
        }

        <div ref="paragraphRenderer" className="hidden" dangerouslySetInnerHTML={ { __html: this.props.html } }/>
      </div>
    );
  }
}

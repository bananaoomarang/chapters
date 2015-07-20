import React, { PropTypes }   from 'react';
import { List }               from 'immutable';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paragraph }          from 'records/Records';
import getCaret               from 'lib/getCaret';
import ifdefBrowser           from 'lib/ifdefBrowser';
import * as StoryActions      from 'actions/StoryActions';
import ParagraphRenderer      from './ParagraphRenderer';

const kbjs = ifdefBrowser( () => {
  return require('keyboardjs');
});

@connect(state => {
  return {
    html:             state.story.getIn(['story', 'html']),
    editing:          state.story.get('editing'),
    focusedParagraph: state.story.getIn(['story', 'focusedParagraph']),
    globalAlignment:  state.story.get('alignment'),
    globalFont:       state.story.get('font')
  };
})

export default class ParagraphView extends React.Component {
  static propTypes = {
    paragraphs:       PropTypes.instanceOf(List).isRequired,
    dispatch:         PropTypes.func.isRequired,
    editing:          PropTypes.bool.isRequired,
    focusedParagraph: PropTypes.number,
    globalAlignment:  PropTypes.string.isRequired,
    globalFont:       PropTypes.object.isRequired,
    html:             PropTypes.string
  }

  state = {
    paragraphs: []
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

      if(this.props.focusedParagraph === -1) return;

      const currentParagraph   = this.refs[this.props.focusedParagraph].getDOMNode();

      const caret              = getCaret(currentParagraph);
      const currentIndex       = Number(currentParagraph.dataset.index);
      const nextIndex          = currentIndex + 1;
      const currentHTML        = currentParagraph.innerHTML;
      const newParagraph       = new Paragraph();

      const newParagraphsArray = this.props.paragraphs
        // Add new paragraphs
        .splice(nextIndex, 0, newParagraph)

        // Slice and dice that sweet sweet text
        .setIn([nextIndex, 'text'], currentHTML.slice(caret.position, currentHTML.length))
        .setIn([currentIndex, 'text'], currentHTML.slice(0, caret.position));

      this.props.dispatch(StoryActions.setStory({ paragraphs: newParagraphsArray }));

      this.refs[nextIndex].getDOMNode().focus();
    });

    kbjs.on('backspace', (e) => {

      if(this.props.focusedParagraph === -1) return;

      const currentParagraph   = this.refs[this.props.focusedParagraph].getDOMNode();

      const currentText        = currentParagraph.textContent;
      const currentIndex       = Number(currentParagraph.dataset.index);
      const beforeIndex        = currentIndex - 1;
      const previousParagraph  = currentParagraph.previousSibling;
      const caret              = getCaret(currentParagraph);

      if (caret.position === 0 && previousParagraph.tagName !== 'DIV') {

        // Stop event bubbling
        e.preventDefault();
        e.stopPropagation();

        const beforeText = previousParagraph.textContent;
        const caretPosition = beforeText.length;

        const newParagraphsArray = this.props.paragraphs
          .splice(currentIndex, 1)
          .setIn([beforeIndex, 'text'], beforeText + currentText);


        this.props.dispatch(
          StoryActions.setStory({
            paragraphs: newParagraphsArray
          })
        );

        if(previousParagraph.textContent.length) {

          getCaret(previousParagraph)
            .setPosition(caretPosition);

        } else if (previousParagraph) {

          previousParagraph.focus();

        }

      }

    });

    kbjs.on('up', () => {

      if(this.props.focusedParagraph === -1) return;

      const currentParagraph   = this.refs[this.props.focusedParagraph].getDOMNode();

      const previousParagraph  = currentParagraph.previousSibling;

      if (previousParagraph) previousParagraph.focus();

    });

    kbjs.on('down', () => {

      if(this.props.focusedParagraph === -1) return;

      const currentParagraph   = this.refs[this.props.focusedParagraph].getDOMNode();

      const nextParagraph  = currentParagraph.nextSibling;

      if (nextParagraph) nextParagraph.focus();

    });
  }

  componentDidMount = () => {
    if(kbjs) this.bindKeys();
  }

  render() {
    const globalStyle = {
      fontSize:  this.props.globalFont.get('size'),
      textAlign: this.props.globalAlignment
    };

    return (
      <div id="paragraph-view">
        <div className="paragraphs" id="paragraph-container" style={globalStyle}>
          {
            this.props.paragraphs.map( (p, index) => {
              const style = {
                fontSize:  p.getIn(['font', 'size']),
                textAlign: p.get('alignment')
              };

              return <p key={index} ref={index} data-index={index} style={style} onFocus={this.handleFocus} onBlur={this.handleBlur} contentEditable={this.props.editing}>{p.get('text')}</p>;
            })
          }
        </div>

        <ParagraphRenderer html={this.props.html} {...bindActionCreators(StoryActions, this.props.dispatch)}/>
      </div>
    );
  }
}

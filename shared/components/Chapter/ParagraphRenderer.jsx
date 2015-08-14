import React, { PropTypes } from 'react';
import { Paragraph }        from 'records/Records';

function toArray(obj) {
  var l = obj.length, i, out = [];
  for(i = 0; i < l; i++) out[i] = obj[i];
    return out;
}

export default class ParagraphRenderer extends React.Component {
  static propTypes = {
    setChapter: PropTypes.func.isRequired,
    html:     PropTypes.string.isRequired
  }

  loadAndSetParagraphs = () => {
    const paragraphs =
      toArray(this.refs['paragraph-renderer'].getDOMNode().childNodes)
        .filter(p => p.nodeName !== '#text')
        .map(p => new Paragraph({
          text: p.innerHTML
        }));

    this.props.setChapter({ paragraphs });
  }

  componentDidMount = () => {
    this.loadAndSetParagraphs();
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.html !== this.props.html) {
      this.loadAndSetParagraphs();
    }
  }

  render() {
    return (
      <div id="paragraph-renderer" ref="paragraph-renderer" className="hidden" dangerouslySetInnerHTML={{ __html: this.props.html }} />
    );
  }
}

import { Record, List, Map } from 'immutable';

export const Story = Record({
  id:     '',
  read:   false,
  write:  false,
  title:  '',
  author: '',
  owner:  '',
  sections: List(),
  chapters: false
});

export const Section = Record({
  id:          '',
  read:        false,
  write:       false,
  title:       '',
  chapters:    List(),
  description: ''
});

export const Paragraph = Record({
  text:     '',
  font: Map({
    size: 'inherit'
  }),
  alignment: 'inherit'
});

export const Chapter = Record({
    id:               '',  // Database ID
    public:           false,
    read:             false,
    write:            false,
    title:            '',
    description:      '???',
    markdown:         '',  // Markdown
    html:             '',  // HTML from ^
    author:           '',
    depends:          List(),              // Other chapters this one depends on having read
    subOrdered:       List(),
    subUnordered:     List(),
    wordCount:        0,                   // Not currently implemented
    paragraphs:       List([Paragraph()]), // Array of objects holding textContent, alignment, font size etc etc
    focusedParagraph: -1                   // Index of focused paragraph, -1 for 'nothing focused'
});


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
    read:             true,
    write:            true,
    title:            '',
    description:      '',
    markdown:         '',  // Markdown
    html:             '',  // HTML from ^
    author:           '',
    depends:          List(), // Other chapters this one depends on having read
    wordCount:        0,      // Not currently implemented
    paragraphs:       List([Paragraph({ text: 'hello' })]),  // Array of objects holding textContent, alignment, font size etc etc
    focusedParagraph: -1      // Index of focused paragraph, -1 for 'nothing focused'
});


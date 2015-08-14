import { Record } from 'immutable';

export const Story = Record({
  id:     '',
  read:   false,
  write:  false,
  title:  '',
  author: '',
  owner:  ''
});

export const Chapter = Record({
    id:               '',  // Database ID
    read:             false,
    write:            false,
    title:            '',
    markdown:         '',  // Markdown
    html:             '',  // HTML from ^
    author:           '',
    depends:          [],  // Other chapters this one depends on having read
    wordCount:        0,   // Not currently implemented
    paragraphs:       [],  // Array of objects holding textContent, alignment, font size etc etc
    focusedParagraph: -1   // Index of focused paragraph, -1 for 'nothing focused'
});

export const Paragraph = Record({
  text:     '',
  font: {
    size: 'inherit'
  },
  alignment: 'inherit'
});


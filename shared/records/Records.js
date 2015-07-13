import { Record } from 'immutable';

//
// Story view related
//
export const Story = Record({
    id:               '',  // Database ID
    title:            '',
    text:             '',  // Markdown
    html:             '',  // HTML from ^
    author:           '',
    wordCount:        0,   // Not currently implemented
    paragraphs:       [],  // Array of objects holding textContent, alignment, font size etc etc
    focusedParagraph: -1   // Index of focused paragraph, -1 for 'nothing focused'
});

export const Paragraph = Record({
  text: '',
  font: {
    size: 'inherit'
  },
  alignment: 'inherit'
});


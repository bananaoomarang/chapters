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

export const Chapter = Record({
    id:               '',     // Database ID
    public:           false,
    read:             false,
    write:            false,
    title:            '',
    description:      '???',
    markdown:         '',     // Markdown
    html:             '',     // HTML from ^
    author:           '',
    depends:          List(), // Other chapters this one depends on having read
    ordered:          List(),
    unordered:        List(),
    wordCount:        0,      // Not currently implemented
});

export const Breadcrumb = Record({
  id:    '',
  title: '',
});

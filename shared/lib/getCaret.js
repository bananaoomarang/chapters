import ifdefBrowser from './ifdefBrowser.js';

var rangy = ifdefBrowser( () => {
  return require('rangy');
});

// Uses rangy to get a manipulatable caret object
export default function (element) {

  const currentHTML      = element.innerHTML;
  const range            = rangy.createRange();
  const elementSelection = rangy.getSelection(element);
  const windowSelection  = rangy.getSelection();
  const node             = element.childNodes[0];

  return {
    position:  elementSelection.anchorOffset,
    selection: elementSelection.focusOffset,

    setPosition (newPosition) {
        switch(newPosition) {
          case 'start':
            range.setStart(node, 0);

          break;

          case 'end':
            range.setStart(node, currentHTML.length);

          break;

          default:
            range.setStart(node, newPosition);

          break;
        }

        range.collapse(true);

        windowSelection.setSingleRange(range);
    }

  };
}

/* MediumEditor extension to add:
 * Legit quotes
 * Legit elipsis
 * Legit Smallcaps */

import MediumEditor from 'medium-editor';
import rangy        from 'rangy';
import getCaret     from 'lib/getCaret';

function insertString(string, index, to) {
  return string.slice(0, index) + to + string.slice(index);
}

function removeChar(string, index) {
  return string.slice(0, index - 1) + string.slice(index);
}

// XXX This ignores fffking tags
function getHtmlPosition(html, offset) {
  const reg      = /(&[a-z]+;)/;
	const relevent = html.split(offset)[0];
  const noTML    = relevent.replace(reg, '');

  if(reg.test(html)) {
    if(html.match(reg).index >= offset) return offset;

    var reduced = html.replace(reg, '');

    return getHtmlPosition(reduced, offset + (html.length - reduced.length - 1));
  };

  return offset;
};

function handleDoubleQuote (node, position) {
  const htmlPosition = getHtmlPosition(node.innerHTML, position);
  
  if(position === 1 || /\s/.test(node.textContent.charAt(position - 2)))
    node.innerHTML = insertString(node.innerHTML, htmlPosition, '&ldquo;');
  else
    node.innerHTML = insertString(node.innerHTML, htmlPosition, '&rdquo;');

  node.textContent = removeChar(node.textContent, position);

  const caret = getCaret(node);
  caret.setPosition(position);
}

function handleSingleQuote (node, position) {
  const htmlPosition = getHtmlPosition(node.innerHTML, position);

  if(position === 1 || /\s/.test(node.textContent.charAt(position - 2)))
    node.innerHTML = insertString(node.innerHTML, htmlPosition, '&lsquo;');
  else
    node.innerHTML = insertString(node.innerHTML, htmlPosition, '&rsquo;');

  node.textContent = removeChar(node.textContent, position);

  const caret = getCaret(node);
  caret.setPosition(position);
}

function handleElipsis (node, position) {
  const htmlPosition = getHtmlPosition(node.innerHTML, position);

  if(
    (node.textContent.charAt(position - 3) === '.' &&
     node.textContent.charAt(position - 2) === '.')

     ||

     (node.textContent.charAt(position - 1) === '.' &&
      node.textContent.charAt(position + 1) === '.')

     ||

     (node.textContent.charAt(position + 1) === '.' &&
      node.textContent.charAt(position + 2) === '.')
  ) {
    node.innerHTML = node.innerHTML.replace(/\.\./, '&hellip;');
    node.textContent = removeChar(node.textContent, position - 1);

    const caret = getCaret(node);
    caret.setPosition(position - 2);
   }
   else {
     node.innerHTML = insertString(node.innerHTML, htmlPosition, '.');
     node.textContent = removeChar(node.textContent, position);

     const caret = getCaret(node);
     caret.setPosition(position);
   }


}

export default MediumEditor.Extension.extend({
  name: 'cheeky-keys', // Safe to say we're in our own namespace here.

  triggers: [
    {
      key:     '"',
      handler: handleDoubleQuote,
    },

    {
      key:     "'",
      handler: handleSingleQuote,
    },

    {
      key:     '.',
      handler: handleElipsis,
    },
  ],

  init: function () {
    MediumEditor.Extension.prototype.init.apply(this, arguments);

    this.subscribe('editableInput', this.handleInput.bind(this));

    this.keys = {};

    this.triggers
      .forEach((key, i) => {
        this.keys[key.keyCode] = i;
      });
  },

  handleInput: function (e) {
    const sel      = MediumEditor.selection.getSelectionRange(this.document);
    const node     = (sel.startContainer.innerHTML === '<br>') ?
      sel.startContainer :
      sel.startContainer.parentNode;
    const lastChar = node.textContent.charAt(sel.startOffset - 1);

    for(let t of this.triggers) {
      if(t.key === lastChar) {
        t.handler(node, sel.startOffset);

        break;
      }
    }
  },
});

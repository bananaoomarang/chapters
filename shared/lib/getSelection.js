import ifdefBrowser from './ifdefBrowser';

var rangy = ifdefBrowser( () => {
  return require('rangy');
});

export default function (/* element */) {

  //var currentHTML = element.innerHTML;
  var selection   = rangy.getSelection();

  return selection;

}

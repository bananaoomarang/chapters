import runInBrowser from './runInBrowser';

var rangy = runInBrowser( () => {
  return require('rangy');
});

export default function (/* element */) {

  //var currentHTML = element.innerHTML;
  var selection   = rangy.getSelection();

  return selection;

}

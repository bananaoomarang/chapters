import ifdefBrowser from 'lib/ifdefBrowser';

// Get the session token safely
// If there isn't one return safe and falsy ''
export default function getToken () {
  return ifdefBrowser(
    () => {
      return window.sessionStorage.getItem('token');
    }
  ) || '';
}

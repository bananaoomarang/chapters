// #ifdev...

export default function ifdefBrowser (f) {
  if(typeof window !== 'undefined') {
    return f();
  } else {
    return null;
  }
}

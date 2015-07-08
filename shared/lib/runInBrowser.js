// #ifdev...

export default function runInBrowser (f) {
  if(typeof window !== 'undefined') {
    return f();
  } else {
    return null;
  }
}

import { Map, List } from 'immutable';
import assign        from 'object-assign';

// Helper to turn objects into immutable records full of immutable objects
export function immutify(obj) {
  let objMut = assign({}, obj);

  Object
    .keys(objMut)
    .forEach(key => {
      switch(typeof objMut[key]) {
        case 'object':
          if(objMut[key]) {

            if(objMut[key] instanceof Array) {
              objMut[key] = new List(objMut[key]);
            } else {
              objMut[key] = immutify(objMut[key]);
            }

          }
      }

    });

    return new Map(objMut);
}

// Abstraction to handle pre-composedstate received from server
// (ie, leave top level keys untouched)
export function immutifyComposedState(obj) {
  let objMut = assign({}, obj);

  Object
    .keys(objMut)
    .forEach(key => {
      objMut[key] = immutify(objMut[key]);
    });

  return objMut;
}

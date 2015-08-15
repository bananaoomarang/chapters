export default function createSetter(type) {
  const toSet = arguments;

  let action = {
    type: type
  };

  return function () {
    for(let i = 1; i < arguments.length; i++)
      action[toSet[i]] = arguments[i];

    return action;
  };
}

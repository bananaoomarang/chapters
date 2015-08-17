export default function createSetter(type) {
  const toSet = arguments;

  let action = {
    type: type
  };

  return function () {
    for(let i = 0; i < arguments.length; i++)
      action[toSet[i + 1]] = arguments[i];

    return action;
  };
}

export default function (str) {
  return str
    .split(' ')
    .map(sub => sub.slice(0, 1).toUpperCase() + sub.slice(1))
    .join(' ');
}

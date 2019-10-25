const disruptOrder = function () {
  const isArray = Array.isArray(this);
  const arr = (isArray ? this : this.split('')).slice();
  const result = [];
  while (true) {
    if (!arr.length) break;
    const index = Math.random() * arr.length | 0;
    result.push(arr.splice(index, 1)[0]);
  }
  return isArray ? result : result.join('')
};
const rdm = function () {
  return this[Math.random() * this.length | 0]
};
Array.prototype.disruptOrder = disruptOrder;
Array.prototype.rdm = rdm;
String.prototype.disruptOrder = disruptOrder;
String.prototype.rdm = rdm;


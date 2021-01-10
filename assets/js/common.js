/**
 * 数组或字符串乱序
 * @returns {*}
 */
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
/**
 * 随机取出一个字符或元素
 * @param n 随机取出n个元素
 * @returns {*}
 */
const rdm = function (n) {
  let temp = '';
  // if(typeof this === 'number' ){ // 比如n为5，则temp最终是'012345'
  if(this instanceof Number){ // 比如n为5，则temp最终是'012345'
    for(let i = 0; i<=this; i++){
      temp += i;
    }
  }else{
    temp = this;
  }
  // console.log(temp)
  if(n){
    return temp.disruptOrder().slice(0, n)
  }else{
    return temp[Math.random() * temp.length | 0]
  }

};
Array.prototype.disruptOrder = disruptOrder;
String.prototype.disruptOrder = disruptOrder;
Number.prototype.disruptOrder = disruptOrder;
Array.prototype.rdm = rdm;
String.prototype.rdm = rdm;
Number.prototype.rdm = rdm;










import './index.css';
import { mull } from './test'
const add = function add(x, y) {
  return x + y;
};

const i = new Promise((resovle) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('1');
    resovle();
  }, 1000);
});

const Test = function Test() {
  this.age = 1;
};

const a = new Test();
// eslint-disable-next-line
console.log(a, 1111222211);
// eslint-disable-next-line
console.log(mull(1, 2));
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import './index.css';
import demo from './demo';

const add = function add(x, y) {
  return x + y;
};

const i = new _Promise((resovle) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('1111');
    resovle();
  }, 1000);
});

const Test = function Test() {
  _classCallCheck(this, Test); // document.write('hello world')

  this.age = 1;
};

const a = new Test(); // eslint-disable-next-line

console.log(add(1, 3), i); // eslint-disable-next-line

console.log(a);
demo();

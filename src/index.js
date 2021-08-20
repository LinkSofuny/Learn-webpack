import './index.css';

const add = function add(x, y) {
  return x + y;
};

const i = new Promise((resovle) => {
  setTimeout(() => {
    console.log('1');
    resovle();
  }, 1000);
});

const Test = function Test() {
  this.age = 1;
};

const a = new Test();

console.log(add(1, 3), i); // eslint-disable-next-line

console.log(a, 1111222211);

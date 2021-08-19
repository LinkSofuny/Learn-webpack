import './index.css';

const add = function add(x, y) {
  return x + y;
};

const i = new Promise((resovle) => {
  setTimeout(() => {
    console.log('11111122111221');
    resovle();
  }, 1000);
}); // eslint-disable-next-line

const Test = function Test() {
  this.age = 1;
};

const a = new Test(); // eslint-disable-next-line

console.log(add(1, 3), i); // eslint-disable-next-line

console.log(a, 1111222211);

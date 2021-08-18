import './index.css';

const add = (x, y) => x + y;

const i = new Promise((resovle) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('1111')
    resovle();
  }, 1000);
});
class Test {
  constructor() {
    // document.write('hello world')
    this.age = 1;
  }
}
const a = new Test();
// eslint-disable-next-line
console.log(add(1, 3), i);
// eslint-disable-next-line
console.log(a);

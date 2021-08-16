import './index.css';

const add = (x, y) => x + y;

const i = new Promise((resovle) => {
  setTimeout(() => {
    console.log('1111');
    resovle();
  }, 1000);
});

// eslint-disable-next-line
console.log(add(1, 3), i);

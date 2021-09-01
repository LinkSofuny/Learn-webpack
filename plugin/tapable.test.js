const { 
    SyncHook,       
    SyncBailHook,   
    AsyncParallelBailHook,  
    AsyncSeriesBailHook 
} = require('tapable')

class Lesson {
    constructor() {
        this.hooks = {
            // 同步钩子
            go: new SyncHook(['address']),
            // 一旦遇到返回值 直接退出
            // go: new SyncBailHook(['address']),
            // 异步并行,  并行执行 如下, 两个计时器会被同时打开
            // leave: new AsyncParallelBailHook(['name', 'age']),
            // 异步串行: 
            leave: new AsyncSeriesBailHook(['name', 'age'])
        }
    }
    tap() {
        // 往hooks容器中注册事件/添加回调函数
        this.hooks.go.tap('钩子1号', address => {
            console.log('钩子1号 Log', address);
        })  
        this.hooks.leave.tapAsync('异步钩子3号', (name, age, callback) => {
            setTimeout( () => {
                console.log('异步钩子3号 Log', name, age);
                callback() // 表示异步任务执行完毕
            }, 2000)
        })  
        // 要求返回一个promise对象
        this.hooks.leave.tapPromise('异步钩子4号 promise', (name, age) => {
            return new Promise( (resovle, reject) => {
                setTimeout( () => {
                    console.log('异步钩子4号 Log', name, age);
                    resovle() // 表示异步任务执行完毕
                }, 1000)
            })
        })
    }
    start() {
        this.hooks.go.call('c318')
        this.hooks.leave.callAsync('Link', 18, function () {
            // 所有 leave 容器中的函数触发完毕, 才出发
            console.log('end');
        })
    }
}
const l = new Lesson();
l.tap()
l.start()
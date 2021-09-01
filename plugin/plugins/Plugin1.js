
class Plugin1 {
    // 异步钩子的使用方法, 与 tapable 一致
    apply(complier) {
        complier.hooks.emit.tap('Plugin1', compilations => {
            console.log('Plugin1 触发');
        })
        complier.hooks.afterEmit.tap('Plugin1', compilations => {
            console.log('afterEmit 触发');
        })
        complier.hooks.done.tap('Plugin1', status => {
            console.log('done 触发');
        })
    }
}
module.exports = Plugin1
const fs = require('fs')
const util = require('util')
const path = require('path')

const webpack = require('webpack')

// webpack形式的文件
const { RawSource } = webpack.sources

// 内置模块 读取文件的函数， 并将其转化为promise的形式
const readFile = util.promisify(fs.readFile)

class Plugin2 {

    apply(complier) {
        complier.hooks.thisCompilation.tap('Plugin2', compilation => {
            compilation.hooks.additionalAssets.tapAsync('Plugin2', async callback => {
                // node中如何打断点
                // debuger 
                // console.log(compilation)
                
                // 读取我们需要的文件
                const data = await readFile(path.resolve(__dirname, 'b.txt'))

                // webpack执行plugins的时候 就会把这个文件一起打包出去
                // compilation.assets['b.txt'] = new RawSource(data)
                // 等价
                compilation.emitAsset('b.txt', new RawSource(data))

                callback()
            })
        })
    }
}

module.exports = Plugin2
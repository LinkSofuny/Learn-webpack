const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const { validate } = require('schema-utils')
const schema = require('./shema.json') 
const path = require('path')
const webpack = require('webpack')
const { RawSource } = webpack.sources
// 专门用与匹配文件列表
const globby = require('globby')

 class CopyWebpackPlugin {
    constructor(options = {}) {
        validate(schema, options, {
            name: 'CopyWebpackPlugin'
        })
        this.options = options
    }
    apply(complier) {
        complier.hooks.thisCompilation.tap('CopyWebpackPlugin', compilation => {
            compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async callback => {
                const { from, ignore } = this.options
                const to = this.options.to ? this.options.to : '.'
                
                /**
                 * globby 接受两个参数
                 * 1. 要处理的文件夹
                 * 2. 其他条件
                 * 
                 * 判断是否为绝对路径 参数1 要求是一个绝对路径
                 * __dirname为当前文件的绝对路径， 但是插件执行实在webpack.config.js中的
                 * 需要的是目录的地址
                 * */ 
                // context 就是 webpack 的配置
                const context = complier.options.context;
                let absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from)
                absoluteFrom = absoluteFrom.replace(/\\/g, '/')

                // 1. 过滤忽略文件
                const paths = await globby(absoluteFrom, { ignore })

                // 2. 读取from中所有资源 paths 为所有要加载的文件路径
                const files = await Promise.all(
                    paths.map(async absolutePath => {
                        // 读文件
                        const data = await readFile(absolutePath)
                        // 得到文件名称
                        const relativePath = path.basename(absolutePath)
                        // 与 to 属性结合 生成关于 to 的路径
                        const filename = path.join(to, relativePath)

                        return {
                            // 文件数据
                            data,
                            // 文件名称
                            filename
                        }
                    })
                )
                
                // 3. 生成webpack格式的资源
                const assets = files.map(file => {
                    const source = new RawSource(file.data)

                    return {
                        source,
                        filename: file.filename
                    }
                })
                // 4. 添加到 compliation 输出出去
                assets.forEach( asset => {
                    compilation.emitAsset(asset.filename, asset.source)
                })
                callback()
            })
        })
    }
}

module.exports = CopyWebpackPlugin
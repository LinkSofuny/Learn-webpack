const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const babel = require('@babel/core')
const util = require('util')
const babelSchema = require('./schema.json')
// babel.transfrom 编译代码的方法
// util.promisify 将普通异步转化为promise异步方法
const transform = util.promisify(babel.transform)


module.exports = function (content, map, meta) {
    // get options
    const options = getOptions(this) || {}

    validate(babelSchema, options, {
        name: 'Babel Loader'
    })
    // 异步
    const callback = this.async();

    // 使用babel 做编译
    transform(content, options)
        .then(({code, map}) => callback(null, code, map, meta))
        .catch( e => callback(e))
}
// loader 本质上是一个函数
const { getOptions } = require('loader-utils') 
const { validate } = require('schema-utils')

const schmea = require('./schema.json')

module.exports = function (content, map, meta) {
    // 获得 options 配置
    const options = getOptions(this)

    console.log('获得 options 配置', options);

    // 校验options的合法性
    validate(schmea, options, {
        name: 'laoder1'
    })

    return content
}

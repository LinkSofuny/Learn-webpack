// loader 本质上是一个函数
const { getOptions } = require('loader-utils')
module.exports = function (content, map, meta) {
    // 获得 options 配置
    const options = getOptions(this)
    console.log('获得 options 配置', options);

    return content
}

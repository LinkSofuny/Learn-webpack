// loader 本质上是一个函数

module.exports = (content, map, meta) => {
    console.log('content', content)
    console.log('map', map)
    console.log('meta', meta)
    return content
}
module.exports.pitch = (content, map, meta) => {
    console.log('content', content)
    console.log('map', map)
    console.log('meta', meta)
}
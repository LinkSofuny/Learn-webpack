const Compiler = require('./Complier')

function myWebpack(config) {
    return new Compiler(config)
}


module.exports = myWebpack
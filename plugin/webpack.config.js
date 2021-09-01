const Plugin1 = require('./plugins/Plugin1')

module.exports ={
    mode:'production',
    plugins: [
        new Plugin1()
    ]
}
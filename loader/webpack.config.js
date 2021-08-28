const path = require('path')

module.exports = {
    mode:'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'loader1'
            }
        ]
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    }
}
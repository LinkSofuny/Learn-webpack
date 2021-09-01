const path = require('path')

module.exports = {
    mode:'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babelLoader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
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
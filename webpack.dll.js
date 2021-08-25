const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dll'),
        library: '[name]_[hash]'
    },
    plugins: [
        // 生产一个 manifest.json
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.resolve(__dirname, 'dll/manifest.json')
        })
    ],
    mode: 'production'
}
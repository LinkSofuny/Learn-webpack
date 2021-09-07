const CopyWebpackPlugin = require('./plugins/copy-webpack-plugin')

module.exports = {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            from: './public',
            to: './css',
            ignore: ['**/index.html']
        })
    ]
}
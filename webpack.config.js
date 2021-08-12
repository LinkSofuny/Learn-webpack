const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    // less文件传换css文件
                    'less-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'buildt.js',
        path: path.resolve(__dirname, 'dist'),
    },
}
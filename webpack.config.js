const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new miniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        // 压缩css
        new optimizeCssAssetsWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    // 替代style-loader 提取js中的css作为单独文件
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }, 
            {
                test: /\.less$/i,
                exclude: /node_modules/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            }
        ]
    },
    devServer: {
        port: '3001', // 默认是 8080
        stats: 'errors-only', // 终端仅打印 error
        compress: true, // 是否启用 gzip 压缩
        contentBase: './dist',
        hot: true // 开启HMR功能
    },
}
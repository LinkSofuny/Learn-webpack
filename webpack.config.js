const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const DashboardPlugin = require("webpack-dashboard/plugin");
const WorkWebpackPlugin = require('workbox-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack');

process.env.NODE_ENV = 'production'

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[hash:10].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new miniCssExtractPlugin({
            filename: 'css/built.[hash:10].css'
        }),
        // 压缩css
        new optimizeCssAssetsWebpackPlugin(),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dll/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, 'dll/jquery.js')
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            // },
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
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
        runtimeChunk: 'single',
        minimizer: [
            // 配置生产环境压缩 css 和 js 的方案
            new TerserPlugin({
                // 开启缓存
                cache: true
                // 开启多进程打包
                parallel: true,
                // 启动source-map
                sourcerMap: true
            })
        ]
    },
    // externals: {
    //     jquery: 'jquery'
    // }
}
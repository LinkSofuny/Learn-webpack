const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new miniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        // 压缩css
        new optimizeCssAssetsWebpackPlugin()
    ],
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ["@babel/preset-env", {
                            useBuiltIns: "usage",
                            corejs: {
                                version: 2
                            },
                            targets: {
                                ie: '9',
                                chrome: '60'
                            }
                        }]
                    ]
                }
            },
            {
                /**
                 * eslint-loader
                 * airbnb -> eslint-config-airbnb-base eslint eslint-plugin-import
                */
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
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
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: 'development'
}
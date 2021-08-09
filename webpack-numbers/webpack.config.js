const path = require('path')
module.exports = (env) => {


    console.log('Goal: ', env); // 'local'
    console.log('Production: ', env.production); // true

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'webpack-number.js',
            library: {
                name:'webpackNumbers',
                type: 'umd'
            },
        },
    }
}
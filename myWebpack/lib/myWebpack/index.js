const fs = require('fs')
const path = require('path')
// 将代码文件解析成 ast 抽象语法树
const babelParser = require('@babel/parser')
// 收集依赖
const traverse = require('@babel/traverse').default
// 转es6代码
const { transformFromAst } = require('@babel/core')
function myWebpack(config) {
    return new Compiler(config)
}

class Compiler {
    constructor(options = {}) {
        this.options = options
    }
    run() {
        /**
         * 1. 读取入口文件内容
         * 2. 解析  成 ast 树
        */
        const filePath = this.options.entry;
        // 读文件
        const file = fs.readFileSync(filePath, 'utf-8')
        const ast = babelParser.parse(file, {
            sourceType: 'module' // 解析文件模块化方案为 ES Module
        })
        // 获取文件夹路径
        const dirname = path.dirname(filePath)
        // 依赖容器
        let dep = {}
        // 3. 收集依赖
        traverse(ast, {
            ImportDeclaration({node}) {
                // 内部会遍历 ast 中 program.body, 判断里面语句类型
                // 如 type 会 ImportDeclaration 则触发当前函数
                // 文件相对路径
                const relativePath = node.source.value;
                // 生成入口文件的绝对路径
                const absoultePath = path.resolve(dirname, relativePath)
                dep[relativePath] = absoultePath
            }
        })
        // console.log(dep);
        // 编译代码, 将代码中浏览器不识别的语法进行编译
        const { code } = transformFromAst (ast, null, {
            presets: ['@babel/preset-env']
        })
        // console.log(code)
    }
}

module.exports = myWebpack
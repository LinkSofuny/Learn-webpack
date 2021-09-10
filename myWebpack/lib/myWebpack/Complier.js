const fs = require('fs')
const path = require('path')
const { getAst, getDep, getCode } = require('./parser')

class Compiler {
    constructor(options = {}) {
        this.options = options
        this.modules = []
    }
    run() {
        const filePath = this.options.entry;
        const fileInfo = this.build(filePath)
        // 将入口文件的信息存入模块中
        this.modules.push(fileInfo)
        
        this.modules.forEach(fileInfo => {
            // 拿到模块文件的所有依赖
            const deps = fileInfo.deps
            for (const relativePath in deps) {
                // 拿到绝对路径
                const absuoltePath = deps[relativePath]
                // 提取依赖文件的信息存入模块中
                const fileInfo = this.build(absuoltePath)

                this.modules.push(fileInfo)
            }
        })
        const depsGraph = this.modules.reduce((graph, module) => {
            return {
                ...graph,
                [module.filePath]: {
                    code: module.code,
                    deps: module.deps
                }
            }
        }, {})
        this.generate(depsGraph)
    }
    build(filePath) {
        // 1. 文件解析成 ast
        const ast = getAst(filePath)
        // 2. 获取 ast 中的所有依赖
        const deps = getDep(ast, filePath)
        // 3. 将 ast 解析成 code
        const code = getCode(ast)
        return {
            filePath,
            deps,
            code
        }
    }
    // 生成输出资源
    generate(depsGraph) {
        const bundle = `
            (function (depsGraph) {

                function require(module) {

                    function localRequire(relavtivePath) {
                        return require(depsGraph[module].deps[relavtivePath])
                    }

                    var exports = {};
                    (function (require, exports, code) {
                        eval(code)
                    })(localRequire, exports, depsGraph[module].code)
                    
                    return exports
                }
                require('${this.options.entry}')

            })(${JSON.stringify(depsGraph)})
        `
        // 生成输出文件的绝对路径
        const filePath = path.resolve(this.options.output.path, this.options.output.filename) 
        fs.writeFileSync(filePath, bundle, 'utf-8')
    }

}

module.exports = Compiler
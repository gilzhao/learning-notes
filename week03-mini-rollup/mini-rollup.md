# mini-rollup

## 01
模块的分析相对于读取的文件代码字符串进行解析。与高级语言的编译过程一致。需要将模块解析为抽象语法树 [AST](https://astexplorer.net/)。

编译器 [acorn](https://www.npmjs.com/package/acorn) 

## 02
TDD 模式
先写测试用例，再进行开发
节点遍历器

## 05
弄清变量的使用和声明

## 06 module对象
代码在模块化过程中必要的关键信息（过程）分析出来
* imports 引入的变量
* exports 导出的变量
* definitions 所有定义的变量

## 07 expand 语句扩展 （expandAllStatements 组装方法）
rollup 最核心内容 treeShaking 组装
* 将变量调用与声明合并
* 依赖外部模块，通过 bundle 加载（下一节讲 08）
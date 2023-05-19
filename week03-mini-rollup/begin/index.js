const fs = require("fs");
const acorn = require("acorn");
const MagicString = require("magic-string");

const code = fs.readFileSync("./source.js").toString(); // 读取的是二进制转换为字符串
const ast = acorn.parse(code, {
  sourceType: "module",
  ecmaVersion: 7,
});

// console.log("ast", ast);

// 遍历 => 查找变量声明
const declarations = {};

ast.body
  .filter((v) => v.type === "VariableDeclaration")
  .map((v) => {
    console.log("声明", v.declarations[0].id.name);
    declarations[v.declarations[0].id.name] = v;
  });

console.log(declarations);

const statements = [];
// 遍历 => 将声明放在调用前
// a() =>   const a = () => 1; a()
ast.body
  .filter((v) => v.type !== "VariableDeclaration")
  .map((node) => {
    statements.push(declarations[node.expression.callee.name]);
    statements.push(node);
  });


console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");
// 导出
const m = new MagicString(code);
statements.map((node) => {
  console.log(m.snip(node.start, node.end).toString());
});
console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");

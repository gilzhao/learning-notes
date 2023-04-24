const { start, setEmitCallback } = require("./parserDom");

const html = `<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <div id="app" class="main"></div>
  </body>
</html>
`;


// 设置属性，并没有执行，和状态机的执行是一样的，跟着 for 循环一起执行完
// 异步代码，定义和执行是两回事，不要只看代码的执行顺序
setEmitCallback((token) => {
  console.log(stack)
  console.log(token)
  if (!token.isClosed) {    
    const { tagName, attributes } = token;
    const element = {
      type: "element",
      tagName,
      attributes,
      children: [],
    };

    stack[stack.length - 1].children.push(element);
    stack.push(element);
  } else {
    if (stack[stack.length - 1].tagName !== token.tagName) {
      console.error("标签不匹配");
    }
    stack.pop();
  }

  // console.log(token);
});

let current = start;
const stack = [{ type: "document", children: []}];

for (char of html) {
  // console.log(c, current.name)
  current = current(char);
}

// 打印输出 node start.js >1.txt
console.log(JSON.stringify(stack, null, ' '))

// 作业：文本节点的处理

const { start, setEmitCallback } = require("./parserDom");
const css = require("css");

const html = `<html lang="en">
  <head>
    <title>HTML DEMO</title>
    <style>
      html body #app { display: 'block'; width: '400px'; height: '300px'; background-color: 'black'; color: 'white'; }
      h1 { color: grey; }
    </style>
  </head>
  <body>
    <div id="app" class="main">
      <h3>hello world</h3>
      how are you ~~
    </div>
  </body>
</html>
`;

const stack = [{ type: "document", children: [] }];
let styleSheet = "";
let textContent = "";

// 设置属性，并没有执行，和状态机的执行是一样的，跟着 for 循环一起执行完
// 异步代码，定义和执行是两回事，不要只看代码的执行顺序
setEmitCallback((token) => {
  // console.log('stack', stack);
  // console.log('token', token);
  if (token.type === "text") {
    let childrenArr = stack[stack.length - 1].children;
    let textNode = null;
    // console.log(childrenArr);
    if (
      !!childrenArr.length &&
      childrenArr[childrenArr.length - 1].type === "text"
    ) {
      textNode = childrenArr[childrenArr.length - 1];
    } else {
      textNode = {
        type: "text",
        value: "",
      };
      childrenArr.push(textNode);
    }
    textNode.value += token.value;
  } else if (!token.isClosed) {
    const { tagName, attributes } = token;
    const element = {
      type: "element",
      tagName,
      attributes,
      children: [],
      parent: stack[stack.length - 1],
    };
    applyStyle(element);
    stack[stack.length - 1].children.push(element);
    stack.push(element);
  } else {
    if (stack[stack.length - 1].tagName !== token.tagName) {
      console.error("标签不匹配");
      return;
    } else {
      if (token.tagName === "style") {
        console.log(stack[stack.length - 1].children[0].value);
        const styleParse = css.parse(
          stack[stack.length - 1].children[0].value,
          {}
        );
        styleSheet = styleParse;
        console.log(JSON.stringify(styleParse, null, " "));
      }
    }

    stack.pop();
  }

  // console.log(token);
});

// TODO: 找 style 标签
// TODO: 分析 CSS

function applyStyle(element) {
  if (!styleSheet) return;
  console.log(styleSheet);

  let selectorArr = styleSheet.stylesheet.rules[0].selectors[0];
  let selectors = selectorArr.split(" ");

  console.log(selectors);
  selectorMatch(selectors[selectors.length - 1], element);
}

function selectorMatch(selector, element) {
  // class id tag [老哥三: "."、"#"、 "(什么都不带的)"]
  // []
  // :

  const regExp = /#[a-z]+|\.[a-z]+|[a-z]+/g;
  // const selectorRegResult = regExp.exec(selector)
  while ((word = regExp.exec(selector))) {
    console.log("word", word);
    if (word[0].charAt(0) === "#") {
      console.log(word[0].charAt(0))
    } else if (word[0].charAt(0) === "#") {

    } else {

    }
  }
}

let current = start;

for (char of html) {
  // console.log(c, current.name)
  current = current(char);
}

// 打印输出 node start.js >1.txt
// console.log(JSON.stringify(stack, null, " "));

// 作业：文本节点的处理

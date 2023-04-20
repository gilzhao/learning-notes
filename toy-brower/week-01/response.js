class Response {
  constructor() {
    this.statusCode = "";
    this.headers = {};
    this.body = "";
  }

  parse(data) {
    const lineReg = /[^\r]*\r\n/g;

    while (true) {
      let lineStr = lineReg.exec(data);

      if (!lineStr || lineStr[0] === "\r\n") break;

      if (lineStr && !lineStr[0].startsWith("HTTP")) {
        const [key, val] = lineStr[0].split(": ");
        this.headers[key + ""] = val;
      }
    }

    console.log(this.headers);

    while (true) {
      let lineStr = lineReg.exec(data);
      const start = lineReg.lastIndex;
      const bodyStrLen = parseInt(lineStr, 16);

      console.log("🚀🚀 ~ Response ~ parse ~ bodyStrLen:", bodyStrLen)
      
      if (bodyStrLen === 0 || !bodyStrLen) break;

      console.log(data.slice(start, start + bodyStrLen))
      lineReg.lastIndex += bodyStrLen + 1;
    }
  }
}

module.exports = Response;

// const str = 'i am teapot'
// const reg = /[a-z]+ |[a-z]+$/ig
// console.log(reg.exec(str))
// console.log(reg.lastIndex)
// console.log(reg.exec(str))
// console.log(reg.lastIndex)
// console.log(reg.exec(str))
// console.log(reg.lastIndex)

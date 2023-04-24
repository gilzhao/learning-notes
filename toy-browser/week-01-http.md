# 实现HTTP协议

听了录播，才发现第一堂课被名回答问题了😂，抱歉我在另一个会上😂😂😂

[【前端面试题】—26道HTTP和HTTPS的面试题(附答案)](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649107417&idx=3&sn=4a9e181ed6ec18504f7f282f057dda72&chksm=be580c74892f856237dd20aa2b0b4baf419bbd88a4e2d52f1e66b3edfed5314bca29b520033f&scene=27)

### 协议
[HTTP协议](https://zhuanlan.zhihu.com/p/45173862)，基于TCP传输的文本协议
* 基于TCP
* 文本协议：网络传输二进制文本

[QUIC协议](https://zhuanlan.zhihu.com/p/405387352)

### ISO-OSI七层网络模型

### TCP 对应 nodejs 的 net 包
https://nodejs.org/dist/latest-v18.x/docs/api/net.html  
https://nodejs.org/dist/latest-v18.x/docs/api/net.html#netcreateconnectionoptions-connectlistener

### stream 流
TCP 层传输数据
2方法 4个api
往里写 往外读

https://nodejs.org/dist/latest-v18.x/docs/api/net.html#netcreateconnectionoptions-connectlistener

```
const net = require("node:net");
const client = net.createConnection({ port: 80, host: "www.baidu.com" }, () => {
  // 'connect' listener.
  console.log("connected to server!");
  client.write("world!\r\n");
});

// 收到数据
client.on("data", (data) => {
  console.log(data.toString());
  // 收到数据结束
  // client.end();
});

client.on("end", () => {
  console.log("disconnected from server");
});
```

发给服务端所有的换行都是 \r\n 两个字符

### 服务端相应请求
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding  
https://nodejs.org/dist/latest-v18.x/docs/api/http.html#httpcreateserveroptions-requestlistener  

### IETF  
https://www.rfc-editor.org/rfc/rfc2616
header method
https://www.rfc-editor.org/rfc/rfc2616#section-14.44
前端需要掌握缓存相关  
https://www.rfc-editor.org/rfc/rfc2616#section-14.21
https://www.rfc-editor.org/rfc/rfc2616#section-14.29
https://www.rfc-editor.org/rfc/rfc2616#page-126
https://www.rfc-editor.org/rfc/rfc2616#section-14.36

https://www.ietf.org/search/?query=http  

https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E5%92%96%E5%95%A1%E5%A3%B6%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE


### 正则表达式 esec
https://juejin.cn/post/7011338084176363533

#### PS.
https://www.nodejs.org/  
https://www.w3.org/


### HTTP 对应 http 包
Request
Response

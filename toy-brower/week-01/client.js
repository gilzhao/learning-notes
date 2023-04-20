const net = require("node:net");
const Response = require('./response')

let httpStr = "";

const client = net.createConnection({ port: 8000 }, () => {
  // 'connect' listener.
  console.log("connected to server!\r\n");
  client.write("GET / HTTP/1.1\r\n");
  client.write("Host: 127.0.0.1\r\n");
  client.write("\r\n");
});

// 收到数据
client.on("data", (data) => {
  console.log("🚀🚀🚀🚀🚀 ~ client.on ~ data:", data.toString())
  httpStr += data.toString();
  // 收到数据结束
  // client.end();
});


client.on("end", () => {
  const response = new Response()
  response.parse(httpStr)
  console.log("disconnected from server");
});

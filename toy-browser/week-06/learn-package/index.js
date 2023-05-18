const PNG = require("pngjs").PNG;
const fs = require("fs");

const littleBox = new PNG({
  colorType: 2,
  height: 100,
  width: 100,
  bgColor: {
    red: 255,
    green: 0,
    blue: 0,
  },
});

console.log(littleBox.data);

// type 1
// for (let i = 0; i < 20000; i++) {
//   littleBox.data[i] = 255;
// }

// type 2
// function drawRect(x1, y1, x2, y2, r, g, b, a) {
//   for (let i = x1; i <= x2; i++) {
//     for (let j = y1; j <= y2; j++) {
//       // 100 * 100 的图片一共 10000 个点，每个点占 4 个字节（rgba）
//       littleBox.data[(j * littleBox.width + i) * 4] = r;
//       littleBox.data[(j * littleBox.width + i) * 4 + 1] = g;
//       littleBox.data[(j * littleBox.width + i) * 4 + 2] = b;
//       littleBox.data[(j * littleBox.width + i) * 4 + 3] = a;
//     }
//   }
// }
// drawRect(10, 10, 50, 50, 255, 255, 0, 255)

// type 3
var width = 100;
var height = 100;
var gl = require("gl")(width, height, { preserveDrawingBuffer: true });

// //Clear screen to red
// gl.clearColor(1, 1, 0, 1);
// gl.clear(gl.COLOR_BUFFER_BIT);

// type 4
// 顶点着色器
let vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertShader,
  `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
  }
  `
);
gl.compileShader(vertShader);

// 片元素着色器（片段着色器）
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fragShader,
  `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  }
  `
);
gl.compileShader(fragShader);

// 创建程序对象
var glProgram = gl.createProgram();
gl.attachShader(glProgram, vertShader);
gl.attachShader(glProgram, fragShader);
gl.linkProgram(glProgram);
gl.useProgram(glProgram);

var a_PointSize = gl.getAttribLocation(glProgram, "a_PointSize");
gl.vertexAttrib1f(a_PointSize, 30.0);

// 1.创建缓冲区对象
var vertexBuffer = gl.createBuffer();
// 2.绑定缓冲区对象（表明了缓冲区对象的用途）
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// 3.向缓冲区对象中写入数据
var tempData = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1, -1, -1]);
gl.bufferData(gl.ARRAY_BUFFER, tempData, gl.STATIC_DRAW);
// 4.获取变量存储位置
var a_Position = gl.getAttribLocation(glProgram, "a_Position");
// 5.把缓冲去对象分配给 a_Position 变量
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
// 6.连接缓冲区对象和 a_Position 变量
gl.enableVertexAttribArray(a_Position);

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);

//Write output as a PPM formatted image
var pixels = new Uint8Array(width * height * 4);
gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

littleBox.data = pixels;

// 画图
littleBox.pack().pipe(fs.createWriteStream("tmp.png"));

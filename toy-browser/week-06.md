# 实现渲染

## pngjs
https://www.npmjs.com/package/pngjs
https://github.com/pngjs/pngjs
优点：
api 非常符合 node 原生的 api 

https://github.com/pngjs/pngjs#example

100 * 100 的图片一共 10000 个点，每个点占 4 个字节（rgba）


## gl
https://www.npmjs.com/package/gl

CPU 串行处理每个像素点
GPU 处理，webGL webGPU （并行处理）
webGl openGL 最传统

利用 GPU， 用 OpenGL、webGL 使用的语言是 GLSL


## liner-gradient
https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient
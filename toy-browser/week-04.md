#

https://juejin.cn/post/7077758893442465806


### 优先级 specificity
最低位 (type selector)
html div
// 0002

html div#id
// 0102

html div#id.a.b
// 0122

// 0        0       0       0
// inline   id      class   type

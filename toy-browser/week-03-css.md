# 实现 CSS 解析

## css parse
https://www.npmjs.com/package/css

## css 选择器
### 命名空间
namespace 命名空间 xmlns  
SVG HTML a <svg:a>  svg|a {} css写法
MathML

[XML 命名空间](https://zh.wikipedia.org/wiki/XML%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4#:~:text=XML%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%20%EF%BC%88%20XML%20namespace%20%EF%BC%8C%E4%B9%9F%E8%AF%91%E4%BD%9C%20XML%E5%90%8D%E7%A7%B0%E7%A9%BA%E9%97%B4%20%E3%80%81%20XML%E5%90%8D%E5%AD%97%E7%A9%BA%E9%97%B4,in%20XML%E3%80%8B%20%EF%BC%88%20%E9%A1%B5%E9%9D%A2%E5%AD%98%E6%A1%A3%E5%A4%87%E4%BB%BD%20%EF%BC%8C%E5%AD%98%E4%BA%8E%20%E4%BA%92%E8%81%94%E7%BD%91%E6%A1%A3%E6%A1%88%E9%A6%86%20%EF%BC%89%E4%B8%AD%E5%AE%9A%E4%B9%89%E3%80%82%20XML%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E4%BA%8E1999%E5%B9%B41%E6%9C%8814%E6%97%A5%E6%88%90%E4%B8%BAW3C%E7%9A%84%E6%8E%A8%E8%8D%90%E8%A7%84%E8%8C%83%E3%80%82)

### TODO
JSON.stringify出现 “Converting circular structure to JSON”


### reg esec
古代编程：while 成功返回值，失败返回null（现代不太推荐）；古典C语言最佳的对应方式
现代编程：最佳实现是返回一个 generator
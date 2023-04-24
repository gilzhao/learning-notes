var css = require('css');
var obj = css.parse('body { font-size: 12px; }', {});
console.log(JSON.stringify(obj, null, ' '));
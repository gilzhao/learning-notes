const analyser = require("../analyser");
const acorn = require("acorn");
const MagicString = require("magic-string");

function getCode(code) {
  return {
    ast: acorn.parse(code, {
      locations: true,
      ranges: true,
      sourceType: "module",
      ecmaVersion: 7,
    }),
    magicString: new MagicString(code),
  };
}

describe("测试 analyser", () => {
  it("_scope _defines", () => {
    const { ast, magicString } = getCode("const a = 1");
    analyser(ast, magicString);
    ast._scope; // 全局作用域
    expect(ast._scope.contains("a")).toBe(true);
    expect(ast._scope.findDefiningScope("a")).toEqual(ast._scope);
    expect(ast.body[0]._defines).toEqual({ a: true });
  });

  describe("_dependsOn", () => {
    it("单语句", () => {
      const { ast, magicString } = getCode("const a = 1");
      analyser(ast, magicString);
      expect(ast.body[0]._dependsOn).toEqual({ a: true });
    });

    it("多语句", () => {
      const { ast, magicString } = getCode(`
        const a = 1;
        function f() {
          const b = 2
        }
      `);
      analyser(ast, magicString);
      expect(ast.body[0]._dependsOn).toEqual({ a: true });
      expect(ast.body[1]._dependsOn).toEqual({ f: true, b: true });
    });
  });
});

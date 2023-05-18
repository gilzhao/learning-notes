function walk(ast, { enter, leave }) {
  // enter(ast);
  // leave(ast);
  visit(ast, null, enter, leave);
}

function visit(node, parent, enter, leave) {
  if (!node) return;
  if (enter) {
    enter.call(null, node, parent);
  }

  // 对象遍历
  const childKeys = Object.keys(node).filter(
    (key) => typeof node[key] === "object"
  );

  childKeys.forEach((childKey) => {
    const value = node[childKey];
    if (Array.isArray((val) => visit(val, node, enter, leave))) {
      value.forEach((val) => visit(val, node, enter, leave));
    } else {
      visit(value, node, enter, leave);
    }
  });

  if (leave) {
    leave(node, parent);
  }
}

module.exports = walk;

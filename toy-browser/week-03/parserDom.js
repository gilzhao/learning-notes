let tagToken = {};
let attributeNameStr = "";
let attributeValueStr = "";
let emit;

function start(char) {
  if (char === "<") {
    tagToken = {
      tagName: "",
      attributes: {},
      isClosed: false,
    };
    return tag;
  } else {
    // 文本节点
    emit({
      type: "text",
      value: char,
    });
    return start;
  }
}

function tag(char) {
  if (char === "/") {
    tagToken.isClosed = true;
    return closeTag;
  } else {
    return openTag(char); // reconsume 输入给下一个用的时候，才调用
  }
}

function closeTag(char) {
  if (char === ">") {
    emit(tagToken);
    return start;
  } else {
    tagToken.tagName += char;
    return closeTag;
  }
}

function openTag(char) {
  if (char === ">") {
    emit(tagToken);
    return start;
  } else if (char === " ") {
    return beforeAttribute;
  } else {
    tagToken.tagName += char;
    return openTag;
  }
}

function beforeAttribute(char) {
  if (char === " ") {
    return beforeAttribute;
  } else if (char === ">") {
    emit(tagToken);
    return start;
  } else {
    attributeNameStr = "";
    attributeValueStr = "";
    return attributeName(char);
  }
}

function attributeName(char) {
  if (char === "=") {
    return attributeValue;
  } else {
    attributeNameStr += char;
    return attributeName;
  }
}

function attributeValue(char) {
  if (char === '"') {
    return doubleQuoted;
  } else if (char === ">") {
    emit(tagToken);
    return start;
  } else {
    throw new Error();
  }
}

function doubleQuoted(char) {
  if (char === '"') {
    tagToken.attributes[attributeNameStr] = attributeValueStr;
    return afterAttribute;
  } else {
    attributeValueStr += char;
    return doubleQuoted;
  }
}

function afterAttribute(char) {
  if (char === " ") {
    return beforeAttribute;
  } else if (char === ">") {
    emit(tagToken);
    return start;
  } else {
    throw new Error();
  }
}

function setEmitCallback(newEmit) {
  emit = newEmit;
}

module.exports = {
  start,
  setEmitCallback,
};

import xss from "xss";

const xssWhiteList = {
  whiteList: {
    img: ["src"],
    strong: [],
    em: [],
    u: [],
    br: [],
    span: ["style"],
  },
  css: {
    whiteList: {
      color: true,
    },
  },
};

export default new xss.FilterXSS(xssWhiteList);
//https://github.com/leizongmin/js-xss
//usage: myXss.process([string])
//defualt: xss([string])

//also could use: https://github.com/cure53/DOMPurify

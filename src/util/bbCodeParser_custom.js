import BBCodeParser from "js-bbcode-parser/src/index.js";

export default new BBCodeParser({
  "\\[br\\]": "<br />",

  "\\[b\\](.+?)\\[/b\\]": "<strong>$1</strong>",
  "\\[i\\](.+?)\\[/i\\]": "<em>$1</em>",
  "\\[u\\](.+?)\\[/u\\]": "<u>$1</u>",

  "\\[img\\](.+?)\\[/img\\]": '<img src="$1">',
  "\\[img=(.+?)\\]": '<img src="$1">',

  "\\[color=(.+?)\\](.+?)\\[/color\\]": '<span style="color:$1;">$2</span>',
});

//https://github.com/DasRed/js-bbcode-parser
//usage: bbCodeParser.parse([string])

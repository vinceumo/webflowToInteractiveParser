const fs = require("fs");
const tomlParse = require("toml").parse;
const createInteractiveFile = require("./createInteractiveFile");
const webflowHtmlParser = require("./webflowHtmlParser");
const webflowCssParser = require("./webflowCssParser");

const main = (config) => {
  const parsedCss = webflowCssParser(
    config.interactive.webflowFiles.css,
    config.interactive.assestsUrl,
    config.interactive.wrapperId
  );

  const parsedHtml = webflowHtmlParser(
    config.interactive.webflowFiles.html,
    config.interactive.assestsUrl
  );

  parsedCss.then((cssResult) => {
    createInteractiveFile(cssResult, parsedHtml, config);
  });
};

const config = tomlParse(fs.readFileSync("./config.toml", "utf-8"));
main(config);

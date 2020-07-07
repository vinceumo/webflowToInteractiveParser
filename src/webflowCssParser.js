const fs = require("fs");
const fsPromises = require("fs").promises;
const postcss = require("postcss");
const postcsswrap = require("postcss-wrap");
const postcssurl = require("postcss-url");
const cssnano = require("cssnano");

const webflowCssParser = async (cssPath, assestsUrl, wrapperId) => {
  try {
    const files = await fsPromises.readdir(cssPath);
    const priorityCss = ["normalize.css", "webflow.css"];
    const lowPriorityCss = [];
    if (files) {
      const css = [];

      files.forEach((file, i) => {
        if (priorityCss.indexOf(file) === -1) {
          files.splice(i, 1);
          lowPriorityCss.push(file);
        }
      });

      files.concat(lowPriorityCss).forEach((file) => {
        css.push(fs.readFileSync(`${cssPath}/${file}`, "utf-8"));
      });

      return postcss([
        postcsswrap({ selector: `#${wrapperId}` }),
        postcssurl({
          filter: "../images/*",
          url: (asset) => `${assestsUrl}/${asset.url}`,
        }),
        cssnano(),
      ])
        .process(css.join(""), { from: undefined, to: undefined })
        .then((result) => {
          return `${result.toString()}`;
        });
    }
  } catch (err) {
    console.error("Oppps Error occured while reading directory!", err);
  }
};

module.exports = webflowCssParser;

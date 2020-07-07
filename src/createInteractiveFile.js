const fs = require("fs");
const clipboardy = require("clipboardy");

const createInteractiveFile = (parsedCSS, parsedHtml, config) => {
  const output = `
      <style>${parsedCSS}</style>
      <style>
      #tbs-body {
        /* overflow: hidden; */
        position: relative;
        z-index: 0;
      }
      </style>
      <div id="${config.interactive.wrapperId}">
        ${parsedHtml}
      </div>
    `;

  if (!fs.existsSync(config.interactive.outputDir)) {
    fs.mkdirSync(config.interactive.outputDir);
  }

  fs.writeFile(`${config.interactive.outputDir}/index.html`, output, function (
    err
  ) {
    if (err) return console.log(err);
    clipboardy.writeSync(output);
    console.log(
      `${config.interactive.outputDir}/index.html created and copied to your clipboard`
    );
  });
};

module.exports = createInteractiveFile;

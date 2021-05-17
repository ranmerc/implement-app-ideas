const fs = require('fs');

if (process.argv.length === 2) {
  console.error(`Font foldernames not specified`);
  process.exit(1);
}

const fontFolder = `fonts/${process.argv[2]}`;

if (!fs.existsSync(fontFolder)) {
  console.error(
    `${fontFolder}\nFolder with name ${process.argv[2]} does not exists\n`
  );
  process.exit(1);
}

const fontName = process.argv[2].replace(/_/g, ' ');

const fontFiles = fs
  .readdirSync(fontFolder)
  .filter((file) => /.*\.(woff|ttf)/.test(file));

let fonts = {};

fontFiles.forEach((fontFile) => {
  const [fontType, extName] = fontFile.match(/(.*)\.(.*)/).slice(1);
  if (fonts[fontType]) fonts[fontType] = fonts[fontType].concat(extName);
  else fonts[fontType] = [].concat(extName);
});

const fontFaceTemplate = (fontName, font, weight, style, format) => {
  return `@font-face{
  font-family: '${fontName}';
  font-weight: ${weight};
  font-style: ${style};
  src: ${format
    .map((f, i) => {
      return `url('./${font}.${f}') format('${f === 'ttf' ? 'truetype' : f}')${
        i === format.length - 1 ? ';' : ','
      }`;
    })
    .join('\n       ')}
  font-display: swap;
}\n\n`;
};

let constructedCSS = '';

Object.keys(fonts).forEach((font, i) => {
  const [fontWeight, fontStyle] = (() => {
    let match = font.match(/latin-(\d*)(\w*)/).slice(1);
    return [
      match[0] ? match[0] : '400',
      match[1] === 'italic' ? match[1] : 'normal',
    ];
  })();
  const fontFormats = fonts[font].sort((a, b) => b.localeCompare(a));
  console.log(
    fontFaceTemplate(fontName, font, fontWeight, fontStyle, fontFormats)
  );
  constructedCSS += fontFaceTemplate(
    fontName,
    font,
    fontWeight,
    fontStyle,
    fontFormats
  );
});

const cssFileName = `${fontFolder}/${fontName}.css`;

fs.writeFileSync(cssFileName, constructedCSS);

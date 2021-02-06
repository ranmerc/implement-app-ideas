const fs = require('fs');

// When no argument is provided
if (!process.argv[2]) {
  console.error(`Font's foldername not specified`);
  process.exit(1);
}

// Unzipped folder for font
const fontFolder = `fonts/${process.argv[2]}`;

// Check if folder Exists
if (!fs.existsSync(fontFolder)) {
  console.log(fontFolder);
  console.error(`Folder with name ${process.argv[2]} does not exists`);
  process.exit(1);
}

const fontName = process.argv[2].replace(/_/g, ' ');

// console.log(fontFolder, fontName);

const fontTypes = fs.readdirSync(fontFolder);

// console.log(fontTypes);

const fontWeightMap = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  '': 400, // for *-Italic.tft
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};

let constructedCSS = '';

const fontFaceTemplate = (ft, weight, style) => {
  return `@font-face{
  font-family: '${fontName}';
  src: url('./${ft}');
  font-weight: ${weight};
  font-style: ${style};
}`;
};

fontTypes.forEach((ft) => {
  if (/.*\.txt/.test(ft)) return;
  const style = /Italic/.test(ft) ? 'italic' : 'normal';
  const weight = fontWeightMap[ft.match(/-(.*)\./)[1].replace('Italic', '')];
  console.log(ft, style, weight, fontFaceTemplate(ft, style, weight));
  constructedCSS += fontFaceTemplate(ft, weight, style) + '\n\n';
});

const cssFileName = `${fontFolder}/${fontName}.css`;

fs.writeFileSync(cssFileName, constructedCSS);

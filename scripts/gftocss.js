const fs = require('fs');

// When no argument is provided
if (process.argv.length === 2) {
  console.error(`Font foldernames not specified`);
  // process.exit(0);
  console.log('Using all folders inside fonts/');
  const folderNames = fs
    .readdirSync('fonts', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  process.argv = process.argv.concat(folderNames);
}

// Generates the font-face string
const fontFaceTemplate = (fontName, ft, weight, style) => {
  return `@font-face{
  font-family: '${fontName}';
  src: url('./${ft}');
  font-weight: ${weight};
  font-style: ${style};
  font-display: swap;
}`;
};

// used to map font file name to font weight
const fontWeightMap = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  '': 400, // for *-Italic.ttf
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};

let failedFonts = [];

for (let i = 2; i < process.argv.length; i++) {
  // Unzipped folder for font
  const fontFolder = `fonts/${process.argv[i]}`;

  // Check if folder Exists
  if (!fs.existsSync(fontFolder)) {
    console.error(
      `${fontFolder}\nFolder with name ${process.argv[i]} does not exists\n`
    );
    failedFonts = failedFonts.concat(process.argv[i]);
    continue;
    // process.exit(1);
  }

  const fontName = process.argv[i].replace(/_/g, ' ');
  // console.log(fontFolder, fontName);

  const fontTypes = fs.readdirSync(fontFolder);
  // console.log(fontTypes);

  let constructedCSS = '';

  fontTypes.forEach((ft) => {
    // All fonts downloaded from Google Fonts are ttf.
    if (!/.*\.ttf/.test(ft)) return;
    const style = /Italic/.test(ft) ? 'italic' : 'normal';
    const weight = fontWeightMap[ft.match(/-(.*)\./)[1].replace('Italic', '')];
    console.log(
      ft,
      style,
      weight,
      fontFaceTemplate(fontName, ft, style, weight)
    );
    constructedCSS += fontFaceTemplate(fontName, ft, weight, style) + '\n\n';
  });

  const cssFileName = `${fontFolder}/${fontName}.css`;

  fs.writeFileSync(cssFileName, constructedCSS);
}

if (failedFonts.length) {
  console.log(
    `\nUnable to build following fonts, check log above for further information.`
  );
  failedFonts.forEach((font, i) => {
    console.log(`${i + 1}. ${font}`);
  });
}

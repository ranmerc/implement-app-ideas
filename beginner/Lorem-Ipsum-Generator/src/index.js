const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const copyButton = document.querySelector('#copy_container');
const output = document.querySelector('#output');
const input = document.querySelector('#no_para');
const generateButton = document.querySelector('#generate');
const type = document.querySelector('#type');

const generateOutput = () => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  let num = parseInt(input.value);
  let generatedLorem = '';
  if (type.selectedIndex === 0) generatedLorem = lorem.generateParagraphs(num);
  else if (type.selectedIndex === 1)
    generatedLorem = lorem.generateSentences(num);
  else generatedLorem = lorem.generateWords(num);
  output.textContent = generatedLorem;
};

generateButton.addEventListener('click', generateOutput);

copyButton.addEventListener('click', () => {
  output.select();
  document.execCommand('copy');
  output.blur();
  window.getSelection().removeAllRanges();
  const assign = (text, icon) => {
    copyButton.querySelector('#copy').textContent = text;
    copyButton.querySelector('i').textContent = icon;
  };
  assign('COPIED', 'check_circle');
  setTimeout(() => {
    assign('COPY', 'file_copy');
  }, 2000);
});

generateOutput();

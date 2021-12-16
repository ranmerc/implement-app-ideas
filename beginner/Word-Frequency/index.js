const formElement = document.querySelector('form');
const inputElement = document.querySelector('textarea');
const loadTemplateElement = document.querySelector('button#load-template');
const tableBodyElement = document.querySelector('table > tbody');

loadTemplateElement.addEventListener('click', () => {
  inputElement.value = `This is a sample paragraph for example. Click on 'Clear' button to empty this field. Enter your own text and click on 'Translate' button to generate the table and graph. You can click on 'Load Template' to load again this template text.`;
});

const countFrequencies = (string) => {
  let words = string.split(/\b/);
  words = words.filter(
    (word) => !/[\.\s\,\\\/\^\%\$\#\@\!\~\`\?\>\<\;\:\{\}\|].*/.test(word)
  );
  let count = {};
  words.forEach((word) => {
    if (count[word] !== undefined) count[word]++;
    else count[word] = 1;
  });
  return Object.fromEntries(
    Object.entries(count).sort(([, a], [, b]) => b - a)
  );
};

const tagCreator = (tagName, textContent) => {
  const ele = document.createElement(tagName);
  ele.textContent = textContent;
  return ele;
};

const randomColor = () => {
  let letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const frequencies = countFrequencies(inputElement.value);
  if (frequencies['']) {
    alert('Input Field Empty');
    return;
  }
  tableBodyElement.innerHTML = '';
  for (key in frequencies) {
    const tr = document.createElement('tr');
    tr.appendChild(tagCreator('td', key));
    tr.appendChild(tagCreator('td', frequencies[key]));
    tableBodyElement.appendChild(tr);
  }
  const existingCanvas = document.querySelector('canvas');
  if (existingCanvas) document.body.removeChild(existingCanvas);
  const chartCanvas = document.createElement('canvas');
  document.body.appendChild(chartCanvas);
  const ctx = chartCanvas.getContext('2d');
  const polarChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: Object.keys(frequencies),
      datasets: [
        {
          label: 'Word Frequency',
          data: Object.values(frequencies),
          backgroundColor: Array.from({
            length: Object.keys(frequencies).length,
          }).map((a) => randomColor()),
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          grid: {
            color: 'white',
          },
        },
      },
    },
  });
});

document.addEventListener('DOMContentLoaded', () => {
  loadTemplateElement.click();
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js', { scope: './' })
      .then(function () {
        console.log('ServiceWorker succesfully registered');
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  } else {
    console.log('Service workers are not supported.');
  }
});

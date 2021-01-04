const selectedfile = document.querySelector('#file');
const selectedfileName = document.querySelector('#filename');

selectedfile.addEventListener('change', () => {
  console.log('change');
  selectedfileName.textContent = selectedfile.files[0]
    ? selectedfile.files[0].name
    : '';
  if (selectedfile.files[0]) {
    let fr = new FileReader();
    fr.addEventListener('load', (e) => {
      fromInput.value = e.target.result;
    });
    fr.readAsText(selectedfile.files[0]);
  } else clearInput(fromInput);
});

const convertButton = document.querySelector('#convert');
const clearButton = document.querySelector('#clear');
const saveButton = document.querySelector('#save');
const copyButton = document.querySelector('#copy');
const fromInput = document.querySelector('#from');
const toInput = document.querySelector('#to');
const invalidJSONMessage = document.querySelector('.error.top');
const copiedMessage = document.querySelector('.notif');
const errorMessage = document.querySelector('.error.bottom');

const clearInput = (input) => {
  console.log('clear');
  input.value = '';
};

const isToJSON = (json) => {
  try {
    const obj = JSON.parse(json);
    if (obj && typeof obj === 'object') return obj;
    else return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const toCSV = (obj) => {
  let csvString = '';
  if (Array.isArray(obj)) {
    csvString += Object.keys(obj[0]);
    obj.forEach((o) => {
      console.log(o);
      csvString += '\n' + Object.values(o);
    });
  } else {
    csvString = Object.keys(obj);
    csvString += '\n' + Object.values(obj);
  }
  return csvString;
};

convertButton.addEventListener('click', () => {
  console.log('convert');
  const obj = isToJSON(fromInput.value);
  if (!obj) {
    invalidJSONMessage.style.display = 'block';
    clearInput(toInput);
    setTimeout(() => {
      invalidJSONMessage.style.display = 'none';
    }, 2000);
    return;
  }
  console.log(obj);
  toInput.value = toCSV(obj);
});

clearButton.addEventListener('click', () => {
  clearInput(fromInput);
  clearInput(toInput);
  clearInput(selectedfile);
  selectedfileName.textContent = '';
});

copyButton.addEventListener('click', () => {
  console.log('copy');
  if (toInput.value === '') {
    errorMessage.textContent = 'Output Empty!';
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 2000);
    return;
  }
  toInput.select();
  document.execCommand('copy');
  copiedMessage.textContent = 'Copied!';
  copiedMessage.style.display = 'block';
  setTimeout(() => {
    copiedMessage.style.display = 'none';
    copiedMessage.textContent = '';
  }, 2000);
});

saveButton.addEventListener('click', () => {
  console.log('save');
  if (toInput.value === '') {
    errorMessage.textContent = 'Output Empty!';
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 2000);
    return;
  }
  let blob = new Blob([toInput.value], { type: 'csv' });
  let a = document.createElement('a');
  a.download = 'JSON2CSV.csv';
  a.href = URL.createObjectURL(blob, { oneTimeOnly: true });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

const generateButton = document.querySelector('#gen');
const fromInput = document.querySelector('#from > input');
const toInput = document.querySelector('#to > input');
const decimalCheck = document.querySelector('input[type=checkbox]');
const decimalBox = document.querySelector('#decimal');
const generatedNumber = document.querySelector('#gen_num');

decimalBox.addEventListener('click', () => {
  decimalCheck.click();
});

const intValue = (ele) => parseInt(ele.value);

const warn = (ele) => {
  ele.style.borderColor = 'red';
  ele.style.borderWidth = '5px';
  setTimeout(() => {
    ele.removeAttribute('style');
  }, 3000);
};

const generateNumber = () => {
  const max = intValue(toInput);
  if (!max) {
    warn(toInput);
    return;
  }
  const min = intValue(fromInput);
  if (!min) {
    warn(fromInput);
    return;
  }
  let randomNumber = Math.random() * (max - min) + min;
  randomNumber = !decimalCheck.checked
    ? Math.floor(randomNumber)
    : randomNumber.toFixed(2);
  generatedNumber.textContent = randomNumber;
};

generateButton.addEventListener('click', generateNumber);
document.addEventListener('DOMContentLoaded', generateNumber);

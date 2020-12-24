const input = document.querySelector('#input');
const output = document.querySelector('#output');

const genDecimal = () => {
  const binary = input.value;

  if (binary.length === 0) {
    output.value = '';
  } else if (/[^10]/.test(binary)) {
    output.classList.add('error');
    output.value = 'Invalid Binary Number';
  } else {
    output.classList.remove('error');
    output.value = parseInt(binary, 2);
  }
};

input.addEventListener('keyup', genDecimal);

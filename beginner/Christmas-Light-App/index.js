const bulbs = document.querySelectorAll('.light');
const colors = document.querySelectorAll('input[type=color]');
const stopButton = document.querySelector('.stop');
const resumeButton = document.querySelector('.resume');
const intensityValue = document.querySelector('input.int_value');
const numOfLights = document.querySelector('#num');

for (let i = 0; i < bulbs.length; ++i) {
  bulbs[i].addEventListener('click', () => {
    colors[i].click();
  });
}

const handleColorChange = (e) => {
  const targetId = e.target.getAttribute('id');
  document.body.style.setProperty(`--${targetId}`, e.target.value);
};

colors.forEach((color) => {
  handleColorChange({ target: color });
  color.addEventListener('input', handleColorChange);
});

stopButton.addEventListener('click', () => {
  bulbs.forEach((b) => {
    b.classList.remove('even');
    b.classList.remove('odd');
    b.style.backgroundColor = '#222222';
  });
});

resumeButton.addEventListener('click', () => {
  bulbs.forEach((b, index) => {
    b.style.backgroundColor = '';
    let className = index % 2 === 0 ? 'even' : 'odd';
    b.classList.add(className);
    b.classList.add(className);
  });
});

intensityValue.addEventListener('change', (e) => {
  const count = e.target.value;
  if (count < 0) return;
  bulbs.forEach((b) => {
    let blur = count * 15;
    b.style.setProperty('--blur', blur + 'px');
    let spread = 5 + 15 * (count - 1);
    b.style.setProperty('--spread', spread + 'px');
  });
});

numOfLights.addEventListener('change', (e) => {
  let num = parseInt(e.target.value);
  bulbs.forEach((b) => {
    b.style.display = '';
  });
  for (let i = bulbs.length - 1; i >= num; --i) {
    bulbs[i].style.display = 'none';
  }
});

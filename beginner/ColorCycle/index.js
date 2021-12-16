const colorType = document.querySelector('#color_type');
const colorFirst = document.querySelector('#color_first > input');
const colorSecond = document.querySelector('#color_second > input');
const colorThird = document.querySelector('#color_third > input');
const incrementFirst = document.querySelector('#increment_first');
const incrementSecond = document.querySelector('#increment_second');
const incrementThird = document.querySelector('#increment_third');
const intervalSelect = document.querySelector('#interval');
const startButton = document.querySelector('#generate');
const allInput = document.querySelectorAll('input');
const allSelect = document.querySelectorAll('select');
const allLabel = document.querySelectorAll('.label');
const box = document.querySelector('#box');
let eventId;

const setHSL = () => {
  const reg = new RegExp(/^[0-9]{1,3}$/);
  const validHSL = (color, limit) => {
    if (!reg.test(color.value) || parseInt(color.value) > limit) {
      color.style.borderColor = 'red';
      setTimeout(() => {
        color.removeAttribute('style');
      }, 3000);
      throw new Error('Not Valid HSL');
    }
    return color.value;
  };
  box.style.setProperty('--fv', validHSL(colorFirst, 240));
  box.style.setProperty('--sv', validHSL(colorSecond, 100) + '%');
  box.style.setProperty('--tv', validHSL(colorThird, 100) + '%');
  box.classList.add('color_hsl');
};

const setHEX = () => {
  const reg = new RegExp(/^[A-Za-z0-9]{1,2}$/);
  const validHEX = (color) => {
    if (!reg.test(color.value)) {
      color.style.borderColor = 'red';
      setTimeout(() => {
        color.removeAttribute('style');
      }, 3000);
      throw new Error('Not Valid Hex');
    }
    return color.value;
  };
  const color = `#${validHEX(colorFirst)}${validHEX(colorSecond)}${validHEX(
    colorThird
  )}`;
  box.style.setProperty('--hex', color);
  box.classList.add('color_hex');
};

const clearBgColor = () => {
  box.removeAttribute('style');
  box.removeAttribute('class');
};

const checkIncrement = (increment) => {
  const reg = new RegExp(/^[0-9]{1,}$/);
  if (!reg.test(increment.value)) {
    increment.style.borderColor = 'red';
    setTimeout(() => {
      increment.removeAttribute('style');
    }, 3000);
    throw new Error('Invalid Increment');
  }
};

const increment = () => {
  if (colorType.selectedIndex) {
    colorFirst.value =
      parseInt(colorFirst.value) + parseInt(incrementFirst.value);
    if (colorFirst.value > 240) {
      colorFirst.value = 0;
    }
    colorSecond.value =
      parseInt(colorSecond.value) + parseInt(incrementSecond.value);
    if (colorSecond.value > 100) {
      colorSecond.value = 0;
    }
    colorThird.value =
      parseInt(colorThird.value) + parseInt(incrementThird.value);
    if (colorThird.value > 100) {
      colorThird.value = 0;
    }
    setHSL();
  } else {
    colorFirst.value = (
      parseInt(colorFirst.value, 16) + parseInt(incrementFirst.value)
    )
      .toString(16)
      .padStart(2, '0');
    if (!colorFirst.value || parseInt(colorFirst.value, 16) > 255)
      colorFirst.value = '00';
    colorSecond.value = (
      parseInt(colorSecond.value, 16) + parseInt(incrementSecond.value)
    )
      .toString(16)
      .padStart(2, '0');
    if (!colorSecond.value || parseInt(colorSecond.value, 16) > 255)
      colorSecond.value = '00';
    colorThird.value = (
      parseInt(colorThird.value, 16) + parseInt(incrementThird.value)
    )
      .toString(16)
      .padStart(2, '0');
    if (!colorThird.value || parseInt(colorThird.value, 16) > 255)
      colorThird.value = '00';
    setHEX();
  }
};

startButton.addEventListener('click', (e) => {
  if (e.target.textContent === 'Start') {
    try {
      checkIncrement(incrementFirst);
      checkIncrement(incrementSecond);
      checkIncrement(incrementThird);
      eventId = setInterval(increment, parseFloat(intervalSelect.value) * 1000);
      if (colorType.selectedIndex) setHSL();
      else setHEX();
      allInput.forEach((i) => {
        i.style.borderColor = '#6d6d6d';
        i.setAttribute('disabled', 'disabled');
      });
      allSelect.forEach((s) => {
        s.setAttribute('disabled', 'disabled');
      });
      allLabel.forEach((l) => {
        l.classList.add('disabled');
      });
    } catch (e) {
      console.error(e);
      clearInterval(eventId);
      return;
    }
    e.target.textContent = 'Stop';
  } else {
    e.target.textContent = 'Start';
    allInput.forEach((i) => {
      i.removeAttribute('style');
      i.removeAttribute('disabled');
    });
    allSelect.forEach((s) => {
      s.removeAttribute('disabled');
    });
    allLabel.forEach((l) => {
      l.classList.remove('disabled');
    });
    clearBgColor();
    clearInterval(eventId);
  }
});

const setBeforeAfter = (fl, sl, tl) => {
  colorFirst.parentElement.setAttribute('data-after', fl);
  colorSecond.parentElement.setAttribute('data-after', sl);
  colorThird.parentElement.setAttribute('data-after', tl);
};

colorType.addEventListener('change', (e) => {
  if (e.target.selectedIndex) setBeforeAfter('H', 'S', 'L');
  else setBeforeAfter('R', 'G', 'B');
});

document.addEventListener('DOMContentLoaded', () => {
  setBeforeAfter('R', 'G', 'B');
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

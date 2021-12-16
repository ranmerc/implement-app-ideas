const formElement = document.querySelector('form');
const systemElement = formElement[0];
const tempElement = formElement[1];
const speedElement = formElement[2];
const formulaElement = document.querySelector('.formula');
const windchillElement = document.querySelector('.windchill');
const tempUnitElement = document.querySelector('._temp > .units');
const speedUnitElement = document.querySelector('._speed > .units');

const formulas = [
  '<span>13.12 + 0.6215T - 11.37v<sup>0.16</sup> + 0.3965Tv<sup>0.16</sup></span>',
  '<span>35.74 + 0.6215T - 35.75v<sup>0.16</sup> + 0.4275Tv<sup>0.16</sup></span>',
];

const tempUnits = ['<sup>o</sup> Celsius', '<sup>o</sup> Fahrenheit'];

const speedUnits = ['kmph', 'mph'];

systemElement.addEventListener('change', () => {
  formulaElement.innerHTML = formulas[systemElement.selectedIndex];
  tempUnitElement.innerHTML = tempUnits[systemElement.selectedIndex];
  speedUnitElement.innerHTML = speedUnits[systemElement.selectedIndex];
});

const imperial = (temp, speed) => {
  return Math.round(
    35.74 +
      0.6215 * temp -
      35.75 * Math.pow(speed, 0.16) +
      0.4275 * temp * Math.pow(speed, 0.16)
  );
};

const metric = (temp, speed) => {
  return Math.round(
    13.12 +
      0.6215 * temp -
      11.37 * Math.pow(speed, 0.16) +
      0.3965 * temp * Math.pow(speed, 0.16)
  );
};

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const speed = speedElement.value;
  const temp = tempElement.value;
  if (!systemElement.selectedIndex && (speed <= 4.8 || temp > 10)) {
    alert(
      'Winchill Factor cannot be calculated for temperatures greater than 10º C and wind speeds lesser than 4.8 kmph'
    );
    windchillElement.innerText = 'not calculable for these values';
    return;
  } else if (systemElement.selectedIndex && (speed <= 3 || temp > 50)) {
    alert(
      'Winchill Factor cannot be calculated for temperatures greater than 50º F and wind speeds lesser than 3 mph'
    );
    windchillElement.innerText = 'not calculable for these values';
    return;
  }
  const windchill = systemElement.selectedIndex
    ? `${imperial(temp, speed)}`
    : `${metric(temp, speed)}`;
  windchillElement.innerText = windchill;
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('../../sw.js', { scope: './' })
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

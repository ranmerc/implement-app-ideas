const input = document.querySelector('input');
const cents = document.querySelector('#cents');
const quarter = document.querySelector('#quarters > td:first-of-type');
const dimes = document.querySelector('#dimes > td:first-of-type');
const nickles = document.querySelector('#nickels > td:first-of-type');
const pennies = document.querySelector('#pennies > td:first-of-type');

input.addEventListener('input', () => {
  let dollars = input.value.replace(/[^\d\.]/g, '');
  // strip to 2 decimal digit
  if (dollars.indexOf('.') !== -1)
    dollars = dollars.substring(0, dollars.indexOf('.') + 3);
  input.value = dollars;
  input.style.width = (input.value.length || 1) + 'ch';
  let cent = Math.round(parseFloat(dollars) * 100);
  cents.textContent = cent;
  quarter.textContent = Math.floor(cent / 50);
  cent = cent % 50;
  dimes.textContent = Math.floor(cent / 10);
  cent = cent % 10;
  nickles.textContent = Math.floor(cent / 5);
  cent = cent % 5;
  pennies.textContent = Math.floor(cent / 1);
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

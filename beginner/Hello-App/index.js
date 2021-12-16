const form = document.querySelector('form');
const username = form[0];
const password = form[1];
const languageCode = form[2];
const warningMessage = document.querySelectorAll('.warning');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (username.value === '' || password.value === '') {
    if (username.value === '') {
      warningMessage[0].style.display = 'block';
      username.style.outline = '2px solid red';
    }
    if (password.value === '') {
      warningMessage[1].style.display = 'block';
      password.style.outline = '2px solid red';
    }
  } else {
    localStorage.setItem('username', username.value);
    localStorage.setItem('languageCode', languageCode.value);
    window.location.href = './hello.html';
  }
});

username.addEventListener('focus', () => {
  warningMessage[0].style.display = 'none';
  username.style.outline = '1px solid black';
});

password.addEventListener('focus', () => {
  warningMessage[1].style.display = 'none';
  password.style.outline = '1px solid black';
});

password.addEventListener('keyup', (e) => {
  password.value = '*'.repeat(password.value.length);
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

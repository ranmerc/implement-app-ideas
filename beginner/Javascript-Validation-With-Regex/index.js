const form = document.querySelector('form');
const errors = document.querySelectorAll('.error');
const emailInput = form[0];
const usernameInput = form[1];
const passwordInput = form[2];
const inputs = [emailInput, usernameInput, passwordInput];
const modal = document.querySelector('#modal-bg');
const regex = [
  new RegExp(/.*@gmail\.com$/), // email regex
  new RegExp(/^[A-Za-z]{1,}$/), // username regex
  new RegExp(/(?=.*([\W_].*){6})(?=.*([A-Z].*){5})(?=.*(\-.*){2})/), // password regex
];

const showError = (i) => {
  errors[i].style.opacity = 1;
};

const hideError = (i) => {
  errors[i].style.opacity = 0;
};

const validate = () => {
  inputs.forEach((input, index) => {
    if (!regex[index].test(input.value)) showError(index);
    else hideError(index);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  inputs.forEach((input, index) => {
    input.addEventListener('focus', () => {
      hideError(index);
    });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate();
    if (
      Array.from(errors).every((e) => (e.style.opacity === '0' ? true : false))
    ) {
      modal.style.display = 'inline';
    }
  });
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

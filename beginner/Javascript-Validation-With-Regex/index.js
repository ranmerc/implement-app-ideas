const errors = document.querySelectorAll('.error');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const inputs = [emailInput, usernameInput, passwordInput];
const form = document.querySelector('form');
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
  form.addEventListener('submit', () => {
    validate();
    if (
      Array.from(errors).every((e) => (e.style.opacity === '0' ? true : false))
    ) {
      modal.style.display = 'inline';
    }
  });
});

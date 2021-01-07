const username = document.querySelector('#username');
const password = document.querySelector('#password');
const languageCode = document.querySelector('#lc');
const loginButton = document.querySelector('#login');
const warningMessage = document.querySelectorAll('.warning');

loginButton.addEventListener('click', () => {
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

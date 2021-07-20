const form = document.querySelector('form');
const usernameInput = form[0];
const passwordInput = form[1];
const successMessage = document.querySelector('#success');
const creds = { username: 'testuser', password: 'mypassword' };

const validateInput = () => {
  const containSpace = (eles) => {
    let res = false;
    eles.forEach((ele) => {
      if (/\s/.test(ele.value)) {
        ele.value = 'Spaces not allowed!';
        ele.style.color = 'red';
        ele.style.pointerEvents = 'none';
        ele.style.setProperty('--input-bgcolor', 'lightyellow');
        ele.style.setProperty('--border-color', 'red');
        ele.style.setProperty('--border-width', '3px');
        res = res ? res : !res;
      }
    });
    return res;
  };

  const matchInput = (ele, exp) => {
    if (ele.value !== exp) {
      ele.value = `Invalid ${ele.getAttribute('placeholder')}!`;
      ele.style.color = 'black';
      ele.style.pointerEvents = 'none';
      ele.style.setProperty('--input-bgcolor', '#ffcccb');
      ele.style.setProperty('--border-color', 'red');
      ele.style.setProperty('--border-width', '3px');
      return false;
    }
    return true;
  };
  if (containSpace([usernameInput, passwordInput])) return;
  let res = [
    matchInput(usernameInput, creds.username),
    matchInput(passwordInput, creds.password),
  ];
  if (res[0] && res[1]) {
    successMessage.style.display = 'block';
    usernameInput.style.pointerEvents = 'none';
    passwordInput.style.pointerEvents = 'none';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInput();
});

form.addEventListener('reset', (e) => {
  e.preventDefault();
  const resetInput = (eles) => {
    eles.forEach((ele) => {
      ele.value = '';
      ele.removeAttribute('style');
    });
  };
  resetInput([usernameInput, passwordInput]);
  successMessage.style.display = 'none';
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

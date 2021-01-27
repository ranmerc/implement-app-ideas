const loginButton = document.querySelector('#login');
const cancelButton = document.querySelector('#cancel');
const usernameInput = document.querySelector('#username > input');
const passwordInput = document.querySelector('#password > input');
const successMessage = document.querySelector('#success');

cancelButton.addEventListener('click', () => {
  const resetInput = (eles) => {
    eles.forEach((ele) => {
      ele.value = '';
      ele.removeAttribute('style');
    });
  };
  resetInput([usernameInput, passwordInput]);
  successMessage.style.display = 'none';
});

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
    matchInput(usernameInput, 'testuser'),
    matchInput(passwordInput, 'mypassword'),
  ];
  if (res[0] && res[1]) {
    successMessage.style.display = 'block';
    usernameInput.style.pointerEvents = 'none';
    passwordInput.style.pointerEvents = 'none';
  }
};

loginButton.addEventListener('click', validateInput);

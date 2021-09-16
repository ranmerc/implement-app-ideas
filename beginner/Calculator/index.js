let stack = [];

const display = {
  inputElement: document.querySelector('.display--input'),
  outputElement: document.querySelector('.display--output'),

  insertInput(value) {
    this.clearOutput();
    this.inputElement.textContent += value;
  },

  removeInput() {
    this.clearOutput();
    let currentValue = this.inputElement.textContent;
    this.inputElement.textContent = currentValue.slice(
      0,
      currentValue.length - 1
    );
  },

  replaceInput(value) {
    this.clearOutput();
    this.inputElement.textContent = value;
  },

  insertOutput(value) {
    this.outputElement.removeAttribute('style');
    this.outputElement.textContent = value;
  },

  clearOutput() {
    this.outputElement.textContent = '';
  },

  outputError() {
    this.outputElement.style.color = 'red';
  },

  outputExists() {
    if (this.outputElement.textContent.length != 0)
      return this.outputElement.textContent;
    else return null;
  },

  clearDisplay() {
    this.inputElement.textContent = '';
    this.outputElement.textContent = '';
  },
};

const deleteButton = document.querySelector('button[value="delete"');

deleteButton.addEventListener('mousedown', longPressStart);
deleteButton.addEventListener('touchstart', longPressStart);
deleteButton.addEventListener('mouseup', longPressEnd);
deleteButton.addEventListener('touchend', longPressEnd);

let timer = null;
let duration = 500;

function longPress() {
  stack = [];
  display.clearDisplay();
}

function longPressStart(e) {
  e.preventDefault();
  if (!timer) timer = setTimeout(longPress, duration);
}

function longPressEnd(e) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    e.target.click();
  }
}

function calculateResult() {
  console.log(stack);

  let intermediateStack = [];
  let temp = '';
  stack.forEach((symbol) => {
    if (/[0-9\.]/.test(symbol)) {
      temp += symbol;
    } else {
      if (temp) {
        intermediateStack = intermediateStack.concat(temp);
        temp = '';
      }
      intermediateStack = intermediateStack.concat(symbol);
    }
  });
  if (temp) {
    intermediateStack = intermediateStack.concat(temp);
    temp = '';
  }

  let operandStack = [],
    operatorStack = [];
  intermediateStack.forEach((ele) => {
    if (/[^+*\-\/]/.test(ele)) operandStack.push(Number(ele));
    else operatorStack.push(ele);
  });
  console.log(operandStack, operatorStack);

  for (let i = 0; i < operatorStack.length; ++i) {
    const operator = operatorStack[i];
    const operand1 = operandStack.shift();
    const operand2 = operandStack.shift();
    console.log(operand1, operand2, operator);
    if (operand1 === undefined || operand2 === undefined) {
      display.insertOutput('Invalid Expression');
      display.outputError();
      return;
    }
    switch (operator) {
      case '+':
        operandStack.unshift(operand1 + operand2);
        break;
      case '-':
        operandStack.unshift(operand1 - operand2);
        break;
      case '/':
        if (operand2 === 0) {
          display.insertOutput("Can't divide by 0");
          display.outputError();
          return;
        }
        operandStack.unshift(operand1 / operand2);
        break;
      case '*':
        operandStack.unshift(operand1 * operand2);
        break;
    }
  }
  display.insertOutput(operandStack[0]);
}

const interaction = (value) => {
  if (value === '=') {
    // For reusing result of an expression in another calculation
    if ((outputValue = display.outputExists()) !== null) {
      display.replaceInput(outputValue);
      stack = [outputValue];
      return;
    }
    calculateResult();
  } else if (['delete', 'Backspace'].includes(value)) {
    stack = stack.slice(0, -1);
    display.removeInput();
  } else if (/[0-9+*\.\/\-]/.test(value)) {
    stack = stack.concat(value);
    display.insertInput(value);
  }
};

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
    interaction(e.target.value);
  });
});

document.addEventListener('keydown', (e) => {
  interaction(e.key);
});

// initial interaction
document.addEventListener('DOMContentLoaded', () => {
  interaction('6');
  interaction('*');
  interaction('7');
  interaction('=');
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

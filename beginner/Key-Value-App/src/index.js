import * as Tone from 'tone';
const keyContainer = document.querySelector('#key');
const keyValue = document.querySelector('#key_value');
const keyCode = document.querySelector('#key_code');
const altValue = document.querySelector('#alt > .indicator_value');
const ctrlValue = document.querySelector('#ctrl > .indicator_value');
const metaValue = document.querySelector('#meta > .indicator_value');
const shiftValue = document.querySelector('#shift > .indicator_value');
const warning = document.querySelector('#warning');

document.addEventListener('keyup', (e) => {
  e.preventDefault();
  e.stopPropagation();
  let spl = ['Alt', 'Control', 'Tab', 'Shift'];
  if (spl.includes(e.key)) {
    return;
  }
  console.log(e);
  keyValue.textContent = e.key === ' ' ? 'Space' : e.key;
  keyCode.textContent = e.keyCode;
  altValue.textContent = e.altKey;
  ctrlValue.textContent = e.ctrlKey;
  metaValue.textContent = e.metaKey;
  shiftValue.textContent = e.shiftKey;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const note =
    letters[Math.floor(Math.random() * letters.length)] +
    (Math.floor(Math.random() * 4) + 1);
  console.log(note);
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(note, '16n');
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    warning.style.display = 'none';
  }, 4000);
});

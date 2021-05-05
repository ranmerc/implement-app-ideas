const plainTextElement = document.querySelector('#encrypt-plain');
const encryptKeyElement = document.querySelector('#encrypt-key');
const encryptResultElement = document.querySelector('#encrypt-result');
const encryptTextElement = document.querySelector('#decrypt-plain');
const decryptKeyElement = document.querySelector('#decrypt-key');
const decryptResultElement = document.querySelector('#decrypt-result');

const alphabetPosition = (alphabet) =>
  alphabet.charCodeAt(0) - 'A'.charCodeAt(0);
const positionAlphabet = (position) =>
  String.fromCharCode('A'.charCodeAt(0) + (position % 26));

const vigCipher = (text, key) => {
  let encryptedText = '';
  for (let i = 0; i < text.length; ++i) {
    if (!/[A-Z]/.test(text[i]) || !/[A-Z]/.test(key[i % key.length]))
      encryptedText += text[i];
    else
      encryptedText += positionAlphabet(
        alphabetPosition(text[i]) + alphabetPosition(key[i % key.length])
      );
  }
  return encryptedText;
};

const vigDecipher = (text, key) => {
  let decryptedText = '';
  for (let i = 0; i < text.length; ++i) {
    if (!/[A-Z]/.test(text[i]) || !/[A-Z]/.test(key[i % key.length]))
      decryptedText += text[i];
    else
      decryptedText += positionAlphabet(
        26 + alphabetPosition(text[i]) - alphabetPosition(key[i % key.length])
      );
  }
  return decryptedText;
};

const encryptInput = (e) => {
  if (plainTextElement.value && encryptKeyElement.value)
    encryptResultElement.value = vigCipher(
      plainTextElement.value,
      encryptKeyElement.value
    );
};

const decryptInput = (e) => {
  if (encryptTextElement.value && decryptKeyElement.value)
    decryptResultElement.value = vigDecipher(
      encryptTextElement.value,
      decryptKeyElement.value
    );
};

plainTextElement.addEventListener('input', encryptInput);

encryptKeyElement.addEventListener('input', encryptInput);

encryptTextElement.addEventListener('input', decryptInput);

decryptKeyElement.addEventListener('input', decryptInput);

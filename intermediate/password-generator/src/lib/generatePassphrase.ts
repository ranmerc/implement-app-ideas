import wordMap from "../assets/eff_wordlist_string";

interface parameterType {
  numberOfWords: number;
  wordSeparator: string;
  includeNumbers: boolean;
  capitalize: boolean;
}

export default function generatePassphrase(parameters: parameterType) {
  let passphrase = "";

  for (let i = 0; i < parameters.numberOfWords; i++) {
    let word = wordMap[generateRandomDiceSequence()];
    word = parameters.capitalize
      ? word.slice(0, 1).toUpperCase() + word.slice(1)
      : word;
    const number = parameters.includeNumbers
      ? `${generateRandomNumber(0, 10)}`
      : "";

    passphrase += `${word}${number}`;

    if (i !== parameters.numberOfWords - 1) {
      passphrase += `${parameters.wordSeparator}`;
    }
  }

  return passphrase;
}

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomDiceSequence = () => {
  let sequence = "";

  for (let i = 0; i < 4; i++) {
    sequence += `${generateRandomNumber(1, 6)}`;
  }

  return sequence;
};

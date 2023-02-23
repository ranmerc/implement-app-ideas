import { generate } from "generate-password-browser";

interface parameterType {
  length: number;
  capital: boolean;
  small: boolean;
  numbers: boolean;
  symbols: boolean;
}

export default function generatePassword(parameters: parameterType) {
  return generate({
    length: parameters.length,
    uppercase: parameters.capital,
    lowercase: parameters.small,
    symbols: parameters.symbols,
    numbers: parameters.numbers,
  });
}

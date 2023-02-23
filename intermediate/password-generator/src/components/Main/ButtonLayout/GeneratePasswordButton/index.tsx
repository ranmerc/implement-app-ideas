import RefreshSVG from "../../../../assets/RefreshSVG";
import generatePassword from "../../../../lib/generatePassword";
import useParameterStore from "../../../../store/useParameterTypeStore";
import usePasswordParametersStore from "../../../../store/usePasswordParametersStore";
import usePassphraseParametersStore from "../../../../store/usePassphraseParametersStore";
import Button from "../Button";
import Styles from "./index.module.css";
import generatePassphrase from "../../../../lib/generatePassphrase";
import useGeneratedValue from "../../../../hooks/useGeneratedValue";

export default function GeneratePasswordButton() {
  const passwordType = useParameterStore((state) => state.type);
  const setGenerated = useGeneratedValue("");
  const passwordParameters = usePasswordParametersStore((state) => {
    return {
      length: state.length,
      capital: state.capital,
      small: state.small,
      numbers: state.numbers,
      symbols: state.symbols,
    };
  });
  const passphraseParameters = usePassphraseParametersStore((state) => {
    return {
      numberOfWords: state.numberOfWords,
      wordSeparator: state.wordSeparator,
      includeNumbers: state.includeNumbers,
      capitalize: state.capitalize,
    };
  });

  const handleClick = () => {
    if (passwordType === "password") {
      const generatedPassword = generatePassword(passwordParameters);
      setGenerated(generatedPassword);
    } else {
      const generatedPassphrase = generatePassphrase(passphraseParameters);
      setGenerated(generatedPassphrase);
    }
  };

  return (
    <Button
      title={`Generate ${
        passwordType === "passphrase" ? "Passphrase" : "Password"
      }`}
      onClick={handleClick}
    >
      {RefreshSVG}Generate{" "}
      {`${passwordType === "passphrase" ? "Passphrase" : "Password"}`}
    </Button>
  );
}

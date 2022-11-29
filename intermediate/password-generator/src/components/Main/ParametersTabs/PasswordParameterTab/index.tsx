import usePasswordParametersStore from '../../../../store/usePasswordParametersStore';
import CheckboxInput from '../CheckboxInput';
import RangeInput from '../RangeInput';
import TabLayout from '../TabLayout';
import Styles from './index.module.css';

export default function PasswordParameter() {
  const [length, setLength] = usePasswordParametersStore((state) => [
    state.length,
    state.setLength,
  ]);

  const [capital, toggleCapital] = usePasswordParametersStore((state) => [
    state.capital,
    state.toggleCapital,
  ]);

  const [small, toggleSmall] = usePasswordParametersStore((state) => [
    state.small,
    state.toggleSmall,
  ]);

  const [numbers, toggleNumbers] = usePasswordParametersStore((state) => [
    state.numbers,
    state.toggleNumbers,
  ]);

  const [symbols, toggleSymbols] = usePasswordParametersStore((state) => [
    state.symbols,
    state.toggleSymbols,
  ]);

  return (
    <>
      <TabLayout>
        <RangeInput
          id="length"
          inputLabel="Length"
          max={128}
          min={7}
          defaultValue={length}
          title="Password Length"
          value={length}
          setValue={setLength}
        />
        <CheckboxInput
          id="capital-letters"
          title="Capital Letters"
          titleSub="(A-Z)"
          checked={capital}
          toggleChecked={toggleCapital}
        />
        <CheckboxInput
          id="small-letters"
          title="Small Letters"
          titleSub="(a-z)"
          checked={small}
          toggleChecked={toggleSmall}
        />
        <CheckboxInput
          id="numbers"
          title="Numbers"
          titleSub="(0-9)"
          checked={numbers}
          toggleChecked={toggleNumbers}
        />
        <CheckboxInput
          id="symbols"
          title="Symbols"
          titleSub="(!@#$%^&*)"
          checked={symbols}
          toggleChecked={toggleSymbols}
        />
      </TabLayout>
    </>
  );
}

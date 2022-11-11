import CheckboxInput from '../CheckboxInput';
import RangeInput from '../RangeInput';
import TabLayout from '../TabLayout';
import Styles from './index.module.css';

export default function PasswordParameter() {
  return (
    <>
      <TabLayout>
        <RangeInput
          id="length"
          inputLabel="Length"
          max={128}
          min={7}
          defaultValue={10}
          title="Password Length"
        />
        <CheckboxInput
          id="capital-letters"
          title="Capital Letters"
          titleSub="(A-Z)"
        />
        <CheckboxInput
          id="small-letters"
          title="Small Letters"
          titleSub="(a-z)"
        />
        <CheckboxInput id="numbers" title="Numbers" titleSub="(0-9)" />
        <CheckboxInput id="symbols" title="Symbols" titleSub="(!@#$%^&*)" />
      </TabLayout>
    </>
  );
}

import CheckboxInput from '../CheckboxInput';
import RangeInput from '../RangeInput';
import TabLayout from '../TabLayout';
import TextInput from '../TextInput';

export default function PassphraseParameterTab() {
  return (
    <>
      <TabLayout>
        <RangeInput
          defaultValue={5}
          min={3}
          max={20}
          id="number-of-words"
          inputLabel="Number of Words"
          title="Number of Words"
        />
        <TextInput
          inputLabel="Word Separator"
          title="Word Separator"
          id="word-separator"
          defaultValue="-"
          maxLength={1}
        />
        <CheckboxInput id="capitalise" title="Capitalise" />
        <CheckboxInput id="include-numbers" title="Include Numbers" />
      </TabLayout>
    </>
  );
}

import usePassphraseParametersStore from '../../../../store/usePassphraseParametersStore';
import CheckboxInput from '../CheckboxInput';
import RangeInput from '../RangeInput';
import TabLayout from '../TabLayout';
import TextInput from '../TextInput';

export default function PassphraseParameterTab() {
  const [numberOfWords, setNumberOfWords] = usePassphraseParametersStore(
    (state) => [state.numberOfWords, state.setNumberOfWords]
  );

  const [includeNumbers, toggleIncludeNumbers] = usePassphraseParametersStore(
    (state) => [state.includeNumbers, state.toggleIncludeNumbers]
  );

  const [capitalize, toggleCapitalize] = usePassphraseParametersStore(
    (state) => [state.capitalize, state.toggleCapitalize]
  );

  const [wordSeparator, setWordSeparator] = usePassphraseParametersStore(
    (state) => [state.wordSeparator, state.setWordSeparator]
  );

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
          value={numberOfWords}
          setValue={setNumberOfWords}
        />
        <TextInput
          inputLabel="Word Separator"
          title="Word Separator"
          id="word-separator"
          defaultValue={wordSeparator}
          maxLength={1}
          value={wordSeparator}
          setValue={setWordSeparator}
        />
        <CheckboxInput
          id="capitalise"
          title="Capitalise"
          checked={capitalize}
          toggleChecked={toggleCapitalize}
        />
        <CheckboxInput
          id="include-numbers"
          title="Include Numbers"
          checked={includeNumbers}
          toggleChecked={toggleIncludeNumbers}
        />
      </TabLayout>
    </>
  );
}

import Styles from './index.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import useOutputStore from '../../../store/useOutputStore';

export default function PasswordOutput() {
  const outputValue = useOutputStore((state) => state.outputValue);
  const setOutputValue = useOutputStore((state) => state.setOutputValue);

  return (
    <>
      <TextareaAutosize
        aria-label="Generated Password"
        className={Styles.output}
        title="Generated Password"
        spellCheck="false"
        value={outputValue}
        onChange={(e) => {
          setOutputValue(e.target.value);
        }}
      ></TextareaAutosize>
    </>
  );
}

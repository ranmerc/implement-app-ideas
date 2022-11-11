import Styles from './index.module.css';
import TextareaAutosize from 'react-textarea-autosize';

export default function PasswordOutput() {
  return (
    <>
      <TextareaAutosize
        aria-label="Generated Password"
        className={Styles.output}
        title="Generated Password"
        spellCheck="false"
      ></TextareaAutosize>
    </>
  );
}

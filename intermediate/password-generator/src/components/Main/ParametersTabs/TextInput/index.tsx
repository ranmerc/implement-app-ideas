import { useState } from 'react';
import Styles from './index.module.css';

export default function TextInput({
  id,
  inputLabel,
  defaultValue = '',
  title,
}: {
  id: string;
  inputLabel: string;
  defaultValue?: string;
  title: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.inputContainer}>
          <label htmlFor={id} className={Styles.label}>
            {inputLabel}
          </label>
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={Styles.input}
            title={title}
          />
        </div>
      </div>
    </>
  );
}

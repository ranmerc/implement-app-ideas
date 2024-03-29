import Styles from './index.module.css';

export default function TextInput({
  id,
  inputLabel,
  defaultValue = '',
  title,
  maxLength,
  value,
  setValue,
}: {
  id: string;
  inputLabel: string;
  defaultValue?: string;
  title: string;
  maxLength: number;
  value: string;
  setValue: (value: string) => void;
}) {
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
            maxLength={maxLength}
          />
        </div>
      </div>
    </>
  );
}

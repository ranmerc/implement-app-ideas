import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';
import { useState } from 'react';
import Styles from './index.module.css';

export default function RangeInput({
  id,
  min,
  max,
  inputLabel,
  defaultValue,
  title,
}: {
  id: string;
  min: number;
  max: number;
  inputLabel: string;
  defaultValue: number;
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
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.valueAsNumber);
            }}
            onBlur={(e) => {
              if (value > max) {
                setValue(max);
              }

              if (value < min) {
                setValue(min);
              }
            }}
            className={Styles.input}
            min={min}
            max={max}
            title={title}
          />
        </div>
        <Root
          defaultValue={[defaultValue]}
          max={max}
          min={min}
          value={[value]}
          className={Styles.root}
          onValueChange={(value) => {
            setValue(value[0]);
          }}
          title={title}
        >
          <Track className={Styles.track}>
            <Range className={Styles.range} />
          </Track>
          <Thumb className={Styles.thumb} />
        </Root>
      </div>
    </>
  );
}

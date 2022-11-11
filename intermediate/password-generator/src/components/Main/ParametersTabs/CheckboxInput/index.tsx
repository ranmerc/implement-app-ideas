import { useState } from 'react';
import Styles from './index.module.css';
import { Root, Indicator } from '@radix-ui/react-checkbox';

export default function CheckboxInput({
  id,
  title,
  titleSub,
}: {
  id: string;
  title: string;
  titleSub?: string;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className={Styles.container}>
        <label htmlFor={id} className={Styles.titleContainer}>
          <span className={Styles.sup}>{title}</span>
          <span className={Styles.sub}>{titleSub}</span>
        </label>
        <Root
          id={id}
          title={title}
          checked={checked}
          onCheckedChange={() => {
            setChecked((state) => !state);
          }}
          className={Styles.checkbox}
        >
          <Indicator />
        </Root>
      </div>
    </>
  );
}

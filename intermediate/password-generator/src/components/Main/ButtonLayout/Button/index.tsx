import { ReactNode } from 'react';
import Styles from './index.module.css';

export default function Button({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <button className={Styles.button} title={title}>
        {children}
      </button>
    </>
  );
}

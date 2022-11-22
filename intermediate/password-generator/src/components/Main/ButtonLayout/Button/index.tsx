import { ReactNode } from 'react';
import Styles from './index.module.css';

export default function Button({
  children,
  title,
  onClick,
}: {
  children: ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <>
      <button className={Styles.button} title={title} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

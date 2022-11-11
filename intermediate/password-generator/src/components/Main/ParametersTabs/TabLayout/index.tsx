import { ReactNode } from 'react';
import Styles from './index.module.css';

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={Styles.container}>{children}</div>
    </>
  );
}

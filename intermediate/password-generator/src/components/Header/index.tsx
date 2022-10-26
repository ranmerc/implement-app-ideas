import Styles from './index.module.css';
import MoonSVG from '../../assets/MoonSVG';
import SunSVG from '../../assets/SunSVG';
import useThemeStore from '../../store/useDarkThemeStore';
import { useEffect } from 'react';

export default function Header() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleDark = useThemeStore((state) => state.toggleDark);

  useEffect(() => {
    if (isDark) {
      document.querySelector('body')?.classList.add('dark-theme');
    } else {
      document.querySelector('body')?.classList.remove('dark-theme');
    }
  }, [isDark]);

  return (
    <header className={`${Styles.container}`}>
      <h1 className={Styles.heading}>Password Generator</h1>
      <button
        type="button"
        onClick={toggleDark}
        className={Styles.button}
        aria-label="Toggle Dark Mode"
      >
        {isDark ? SunSVG : MoonSVG}
      </button>
    </header>
  );
}

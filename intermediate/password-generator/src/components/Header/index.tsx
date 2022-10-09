import Styles from './index.module.css';
import MoonSVG from '../../assets/MoonSVG';

export default function Header() {
  const toggleTheme = () => {
    document.querySelector('body')?.classList.toggle('dark-theme');
  };

  return (
    <header className={`${Styles.container}`}>
      <h1 className={Styles.heading}>Password Generator</h1>
      <button
        type="button"
        onClick={toggleTheme}
        className={Styles.button}
        aria-label="Toggle Dark Mode"
      >
        {MoonSVG}
      </button>
    </header>
  );
}

import CopySVG from '../../../../assets/CopySVG';
import Styles from './index.module.css';

export default function GeneratedPassword({
  password,
  timestamp,
}: {
  password: string;
  timestamp: string;
}) {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.passwordContainer}>
          <div className={Styles.password}>{password}</div>
          <div className={Styles.timestamp}>
            {timestamp}
            {/* {{timestamp}.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })} */}
          </div>
        </div>
        <button title="Copy Password" className={Styles.copyButton}>
          {CopySVG}
        </button>
      </div>
    </>
  );
}

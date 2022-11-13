import GeneratedPassword from './GeneratedPassword';
import Styles from './index.module.css';

export default function PasswordHistory() {
  return (
    <>
      <section className={Styles.container}>
        <h1 className={Styles.heading}>Password History</h1>
        <ul className={Styles.list}>
          <li>
            <GeneratedPassword
              password="23j$la@jds%fjk20k#ljd"
              timestamp={'Sep 8, 2022, 3:05:13 PM'}
            />
          </li>
          <li>
            <GeneratedPassword
              password="23j$la@jds%fjk20k#ljd"
              timestamp={'Sep 8, 2022, 3:05:13 PM'}
            />
          </li>
        </ul>
      </section>
    </>
  );
}

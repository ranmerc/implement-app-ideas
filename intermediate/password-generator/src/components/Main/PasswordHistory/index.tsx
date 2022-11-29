import usePasswordHistoryStore from '../../../store/usePasswordHistoryStore';
import GeneratedPassword from './GeneratedPassword';
import Styles from './index.module.css';

export default function PasswordHistory() {
  const passwordList = usePasswordHistoryStore((state) => state.list);
  const clearList = usePasswordHistoryStore((state) => state.clearList);

  return (
    <>
      <section className={Styles.container}>
        <div className={Styles.header}>
          <h1 className={Styles.heading}>Password History</h1>
          <button
            title="Clear Password History"
            onClick={clearList}
            className={Styles.clearButton}
          >
            Clear
          </button>
        </div>
        <ul className={Styles.list}>
          {passwordList.map((password) => {
            return (
              <GeneratedPassword
                password={password.password}
                timestamp={password.timestamp}
                key={password.password + password.timestamp}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}

import ButtonLayout from './ButtonLayout';
import PasswordOutput from './PasswordOutput';
import Styles from './index.module.css';
import ParametersTabs from './ParametersTabs';
import PasswordHistory from './PasswordHistory';

export default function Main() {
  return (
    <>
      <main className={Styles.container}>
        <PasswordOutput />
        <ButtonLayout />
        <ParametersTabs />
        <PasswordHistory />
      </main>
    </>
  );
}

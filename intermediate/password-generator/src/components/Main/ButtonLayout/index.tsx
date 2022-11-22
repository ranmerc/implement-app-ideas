import CopyPasswordButton from './CopyPasswordButton';
import GeneratePasswordButton from './GeneratePasswordButton';
import Styles from './index.module.css';

export default function ButtonLayout() {
  return (
    <div className={Styles.container}>
      <GeneratePasswordButton />
      <CopyPasswordButton />
    </div>
  );
}

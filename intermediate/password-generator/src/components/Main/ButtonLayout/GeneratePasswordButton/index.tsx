import RefreshSVG from '../../../../assets/RefreshSVG';
import usePasswordHistoryStore from '../../../../store/usePasswordHistoryStore';
import Button from '../Button';
import Styles from './index.module.css';

export default function GeneratePasswordButton() {
  const addPassword = usePasswordHistoryStore((state) => state.addPassword);

  const handleClick = () => {
    addPassword({
      password: 'generatedPassword',
      timestamp: new Date().toLocaleTimeString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    });
  };

  return (
    <Button title="Generate Password" onClick={handleClick}>
      {RefreshSVG}Generate Password
    </Button>
  );
}

import RefreshSVG from '../../../../assets/RefreshSVG';
import Button from '../Button';
import Styles from './index.module.css';

export default function GeneratePasswordButton() {
  const handleClick = () => {
    console.log('Password Generated');
  };

  return (
    <Button title="Generate Password" onClick={handleClick}>
      {RefreshSVG}Generate Password
    </Button>
  );
}

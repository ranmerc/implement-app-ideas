import CopySVG from '../../../assets/CopySVG';
import RefreshSVG from '../../../assets/RefreshSVG';
import Button from './Button';
import Styles from './index.module.css';

export default function MainButton() {
  return (
    <div className={Styles.container}>
      <Button title="Generate Password">{RefreshSVG}Generate Password</Button>
      <Button title="Copy Password">{CopySVG}Copy Password</Button>
    </div>
  );
}

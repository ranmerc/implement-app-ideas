import CopySVG from '../../../../assets/CopySVG';
import Button from '../Button';
import useOutputStore from '../../../../store/useOutputStore';
import useParameterStore from '../../../../store/useParameterTypeStore';
import { toast } from 'react-hot-toast';
import Styles from './index.module.css';

export default function CopyPasswordButton() {
  const outputState = useOutputStore((state) => state.outputValue);
  const passwordType = useParameterStore(state => state.type);

  const handleClick = () => {
    navigator.clipboard.writeText(outputState);
    toast.success(`${passwordType === 'passphrase' ? "Passphrase" : "Password"} Copied`);
  };

  return (
    <>
      <Button title={`Copy ${passwordType === 'passphrase' ? "Passphrase" : "Password"}`} onClick={handleClick}>
        {CopySVG}Copy {`${passwordType === 'passphrase' ? "Passphrase" : "Password"}`}
      </Button>
    </>
  );
}

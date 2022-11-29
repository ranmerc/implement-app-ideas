import CopySVG from '../../../../assets/CopySVG';
import Button from '../Button';
import useOutputStore from '../../../../store/useOutputStore';
import { toast, Toaster } from 'react-hot-toast';
import Styles from './index.module.css';

export default function CopyPasswordButton() {
  const outputState = useOutputStore((state) => state.outputValue);

  const handleClick = () => {
    navigator.clipboard.writeText(outputState);
    toast.success('Password Copied');
  };

  return (
    <>
      <Button title="Copy Password" onClick={handleClick}>
        {CopySVG}Copy Password
      </Button>
      <Toaster
        toastOptions={{
          style: {
            background: 'var(--cyan1)',
            border: '1px solid var(--slate9)',
            borderRadius: '5px',
            color: 'var(--cyan12)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.2rem',
            boxShadow: 'none',
          },
        }}
      />
    </>
  );
}

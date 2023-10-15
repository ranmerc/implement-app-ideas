import CopySVG from "../../../../assets/CopySVG";
import Styles from "./index.module.css";
import { toast } from "react-hot-toast";

export default function GeneratedPassword({
  password,
  timestamp,
}: {
  password: string;
  timestamp: string;
}) {
  const handleClick = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password Copied");
  };

  return (
    <li>
      <div className={Styles.container}>
        <div className={Styles.passwordContainer}>
          <div className={Styles.password}>{password}</div>
          <div className={Styles.timestamp}>{timestamp}</div>
        </div>
        <button
          title="Copy Password"
          className={Styles.copyButton}
          onClick={handleClick}
        >
          {CopySVG}
        </button>
      </div>
    </li>
  );
}

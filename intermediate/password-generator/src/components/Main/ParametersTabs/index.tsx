import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import PassphraseParameterTab from './PassphraseParameterTab';
import PasswordParameter from './PasswordParameterTab';
import Styles from './index.module.css';

export default function ParametersTabs() {
  return (
    <>
      <Root defaultValue="Password" orientation="vertical">
        <List
          aria-label="Generation Parameters Tab"
          className={Styles.buttonGroup}
        >
          <Trigger value="Password" className={Styles.label}>
            Password
          </Trigger>
          <Trigger value="Passphrase" className={Styles.label}>
            Passphrase
          </Trigger>
        </List>
        <Content value="Password">
          <PasswordParameter />
        </Content>
        <Content value="Passphrase">
          <PassphraseParameterTab />
        </Content>
      </Root>
    </>
  );
}

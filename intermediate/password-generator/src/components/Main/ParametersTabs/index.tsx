import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import PassphraseParameterTab from './PassphraseParameterTab';
import PasswordParameter from './PasswordParameterTab';
import Styles from './index.module.css';
import { useEffect, useState } from 'react';
import useParameterStore, {
  TypeOfPassword,
} from '../../../store/useParameterTypeStore';

export default function ParametersTabs() {
  const [currentTab, setCurrentTab] = useState<TypeOfPassword>('password');
  const setParamType = useParameterStore((state) => state.setType);

  useEffect(() => {
    setParamType(currentTab);
  }, [currentTab]);

  return (
    <>
      <Root
        defaultValue={currentTab}
        orientation="vertical"
        value={currentTab}
        onValueChange={(value) => {
          setCurrentTab(value as TypeOfPassword);
        }}
      >
        <List
          aria-label="Generation Parameters Tab"
          className={Styles.buttonGroup}
        >
          <Trigger value="password" className={Styles.label}>
            Password
          </Trigger>
          <Trigger value="passphrase" className={Styles.label}>
            Passphrase
          </Trigger>
        </List>
        <Content value="password">
          <PasswordParameter />
        </Content>
        <Content value="passphrase">
          <PassphraseParameterTab />
        </Content>
      </Root>
    </>
  );
}

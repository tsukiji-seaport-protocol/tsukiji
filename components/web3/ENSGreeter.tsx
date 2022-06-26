import { Image, Stack } from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { useEffect, useState } from "react";
import { useEnsAvatar, useEnsName } from "wagmi";
import styles from "@styles/Home.module.css";

interface ENSGreeterProps {
  account: string;
}

export const ENSGreeter = ({ account }: ENSGreeterProps) => {
  const { data: ENSData, isError: ENSisError, isLoading: ENSIsLoading } = useEnsName({
    address: account,
    onSuccess(data) {
      console.log('Success ENS data', data)
    },
  })

  const { data: ENSAvatarData } = useEnsAvatar({
    addressOrName: account,
    onSuccess(data) {
      console.log('Success ENS avatar', data)
    },
  })

  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (!account) { return; }
    const abridgedAddr = abridgeAddress(account);
    if (ENSData) {
      setDisplayName(ENSData);
    } else {
      if (abridgedAddr) {
        setDisplayName(abridgedAddr);
      } else {
        setDisplayName('');
      }
    }

  }, [account, ENSData, ENSIsLoading, ENSisError])
  return (<>
    <Stack gap={4} alignContent="center">
      <h1 style={{ textAlign: "center" }} className={styles.title}>
        Tsukiji
      </h1>
      <div>Hello {displayName}!</div>
      {ENSAvatarData && <Image
        src={ENSAvatarData}
        alt="ENS Avatar"
        className='ens-avatar'
        onError={() => <></>}
      />}
    </Stack>
  </>)
};
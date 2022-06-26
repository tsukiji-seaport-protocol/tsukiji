import { ENSGreeter } from "@components/web3/ENSGreeter";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import styles from "@styles/Home.module.css";

const Profile: NextPage = () => {
  const { data: accountData, isError: accountIsError, isLoading: accountIsLoading } = useAccount({
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.connectButton}>
          <ConnectButton />
        </div>
        {accountData?.address && <ENSGreeter account={accountData.address} />}
        {!accountData?.address && <p>Please connect wallet</p>}
      </main>
    </div>
  )
}

export default Profile;

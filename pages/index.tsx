import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import { CreateOrderInput, CurrencyItem } from "@opensea/seaport-js/lib/types";
import { Seaport } from "@opensea/seaport-js";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { providers } from "ethers";

const Home: NextPage = () => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: accountData, isError, isLoading } = useAccount();

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  const seaport = new Seaport(ethersProvider);

  const sampleOrder: CurrencyItem = {
    amount: "0",
  };

  const createSeaportOrder = async () => {
    if (!accountData) throw Error("No address found");
    const orderParams: CreateOrderInput = {
      offer: [sampleOrder],
      consideration: [sampleOrder],
    };
    const { executeAllActions } = await seaport?.createOrder(
      orderParams,
      accountData?.address
    );
    const order = await executeAllActions();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={() => connect()}>Connect Wallet</button>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.grid}>
          <button onClick={createSeaportOrder}>click me</button>
        </div>
      </main>
    </div>
  );
};

export default Home;

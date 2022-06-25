import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  ConsiderationInputItem,
  CreateInputItem,
  CreateOrderInput,
} from "@opensea/seaport-js/lib/types";
import { Seaport } from "@opensea/seaport-js";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { providers } from "ethers";
import TokenInput from "./components/TokenInput";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: accountData, isError, isLoading } = useAccount();

  const [offerItems, setOfferItems] = useState<CreateInputItem[]>([]);
  const [considerationItems, setConsiderationItems] = useState<
    ConsiderationInputItem[]
  >([]);

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  const seaport = new Seaport(ethersProvider);
  const createSeaportOrder = async () => {
    if (!accountData) throw Error("No address found");
    const orderParams: CreateOrderInput = {
      offer: offerItems,
      consideration: considerationItems,
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
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "50px",
          }}
        >
          <ConnectButton />
        </div>
        <div
          style={{
            display: "flex",
            width: "500px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "500px",
              justifyContent: "space-between",
            }}
          >
            <TokenInput
              title={"OFFER"}
              setItems={setOfferItems}
              items={offerItems}
              isOffer
            ></TokenInput>
            <TokenInput
              title={"CONSIDERATION"}
              setItems={setConsiderationItems}
              items={considerationItems}
            ></TokenInput>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: "1rem",
            width: "500px",
            justifyContent: "space-between",
          }}
        >
          <DurationSelection />
          {/* <CreateListingButton></CreateListingButton> */}
          <div className={styles.grid}>
            <button onClick={createSeaportOrder}>click me</button>
          </div>
        </div>
      </main>
    </div>
  );
};

const DurationSelection = () => {
  return (
    <div>
      <select name="cars" id="cars">
        <option value="24">1 day</option>
        <option value="72">3 days</option>
        <option value="168">7 days</option>
        <option value="720">1 month</option>
      </select>
    </div>
  );
};

export default Home;

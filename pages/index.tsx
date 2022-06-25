import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  ConsiderationInputItem,
  CreateInputItem,
  CreateOrderInput,
} from "@opensea/seaport-js/lib/types";
import { Seaport } from "@opensea/seaport-js";
import { useAccount } from "wagmi";
import { providers } from "ethers";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { OrderPage } from "./components/OrderPage";
import { Stack } from "@chakra-ui/react";
import { OfferItem, ConsiderationItem } from "types/tokenTypes";

const Home: NextPage = () => {
  const { data: accountData, isError, isLoading } = useAccount();

  const [offerItems, setOfferItems] = useState<OfferItem[]>([]);

  const [considerationItems, setConsiderationItems] = useState<
    ConsiderationItem[]
  >([]);

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  const seaport = new Seaport(ethersProvider);

  const createSeaportOrder = async () => {
    if (!accountData) throw Error("No address found");
    const orderParams: CreateOrderInput = {
      offer: offerItems.map((item) => item.inputItem),
      consideration: considerationItems.map((item) => item.inputItem),
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
        <div className={styles.connectButton}>
          <ConnectButton />
        </div>
        <Stack gap={4} alignContent="center">
          <h1 style={{ textAlign: "center" }} className={styles.title}>
            Tsukiji
          </h1>
          <OrderPage
            {...{
              createSeaportOrder,
              offerItems,
              setOfferItems,
              considerationItems,
              setConsiderationItems,
            }}
          />
        </Stack>
      </main>
    </div>
  );
};

export default Home;

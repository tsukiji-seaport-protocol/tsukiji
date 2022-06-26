import type { NextPage } from "next";
import styles from "../styles/CreateListing.module.css";
import {
  CreateOrderInput,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { Seaport } from "@opensea/seaport-js";
import { useAccount } from "wagmi";
import { providers } from "ethers";
import { useCallback, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { OrderPage } from "@components/OrderPage";
import { Stack } from "@chakra-ui/react";
import { OfferItem, ConsiderationItem } from "types/tokenTypes";

const Home: NextPage = () => {
  const { data: accountData, isError, isLoading } = useAccount();

  const [order, setOrder] = useState<OrderWithCounter>();

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

    const res = await executeAllActions();
    setOrder(res);
    console.log("order: ", JSON.stringify(res));
    await saveOrder(res);
  };

  const sampleOrder = {
    parameters: {
      offerer: "0x17e547d79C04D01E49fEa275Cf32ba06554f9dF7",
      zone: "0x0000000000000000000000000000000000000000",
      zoneHash:
        "0x3000000000000000000000000000000000000000000000000000000000000000",
      startTime: "1656213109",
      endTime:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      orderType: 0,
      offer: [
        {
          itemType: 2,
          token: "0xc3a949d2798e13ce845bdd21bf639a28548faf30",
          identifierOrCriteria: "3",
          startAmount: "1",
          endAmount: "1",
        },
      ],
      consideration: [
        {
          itemType: 2,
          token: "0x63f9e083a76e396c45b5f6fce41e6a91ea0a1400",
          identifierOrCriteria: "11",
          startAmount: "1",
          endAmount: "1",
          recipient: "0x17e547d79C04D01E49fEa275Cf32ba06554f9dF7",
        },
      ],
      totalOriginalConsiderationItems: 1,
      salt: "0xa4969fa90bcbe4027232fc358e49866c",
      conduitKey:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      counter: 0,
    },
    signature:
      "0x697185edf8caf03ee31c636a3f64c92ef5c1eb2cd280d791abd3e013d14d046221f0ac47fde1138105913046cc3b6ce14041736ce9b00e81030d4eb31b325dc3",
  };

  const saveOrder = useCallback(async (order: OrderWithCounter) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data: ", data);
    } catch (err) {
      console.log("Error request: ", err);
    }
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.connectButton}>
          <ConnectButton />
          {/* <button
            onClick={() => {
              saveOrder(sampleOrder);
            }}
          >
            ayoooo
          </button> */}
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

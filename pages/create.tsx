import {
  Select,
  Box,
  Button,
  HStack,
  NumberInputField,
  NumberInput,
  Spacer,
  Text,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import styles from "../styles/Create.module.css";
import {
  CreateOrderInput,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { Seaport } from "@opensea/seaport-js";
import { useAccount } from "wagmi";
import { providers } from "ethers";
import { useCallback, useState } from "react";
import { OfferItem, ConsiderationItem } from "types/tokenTypes";
import { NavBar } from "../components/NavBar";
import { TokenSelection } from "@components/TokenSelection";
import { ItemType } from "@opensea/seaport-js/lib/constants";

const Home: NextPage = () => {
  const { data: accountData } = useAccount();

  const [order, setOrder] = useState<OrderWithCounter>();
  const [loading, setLoading] = useState<boolean>(false);
  const [txnsuccess, setTxnSuccess] = useState<boolean>(false);

  const [offerItems, setOfferItems] = useState<OfferItem[]>([]);

  const [considerationItems, setConsiderationItems] = useState<
    ConsiderationItem[]
  >([]);

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  const seaport = new Seaport(ethersProvider as any);

  const createSeaportOrder = async () => {
    if (!accountData) throw Error("No address found");
    setLoading(true);
    const filteredOfferItems = offerItems.filter(
      (item) => item.name !== "Ether"
    );
    const filteredConsiderationItems = considerationItems.filter(
      (item) => item.name !== "Ether"
    );

    const orderParams: CreateOrderInput = {
      offer: filteredOfferItems.map((item) => item.inputItem),
      consideration: filteredConsiderationItems.map((item) => item.inputItem),
    };

    const { executeAllActions } = await seaport?.createOrder(
      orderParams,
      accountData?.address
    );

    const res = await executeAllActions();
    setOrder(res);
    console.log("order: ", JSON.stringify(res));
    await saveOrder(res);
    setTxnSuccess(true);
    setLoading(false);
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
          recipient: "0xB7a235bC60f0E81b95262a25c64D714F4C430B8a",
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
      <NavBar />
      <main className={styles.main}>
        <div className={`${styles.header}`}>CREATE LISTING</div>
        {!accountData?.address && (
          <Text color="white" fontSize="1.2rem" pb={5}>
            Please connect your wallet to get started.
          </Text>
        )}
        <HStack className={styles.inputContainer}>
          <TokenSelection
            title="YOUR OFFER"
            setItems={setOfferItems}
            items={offerItems}
            isOffer
            account={accountData?.address}
          />
          <TokenSelection
            title="IN EXCHANGE FOR"
            setItems={setConsiderationItems}
            items={considerationItems}
            isOffer={false}
            account={accountData?.address}
          />
        </HStack>

        <HStack className={styles.bottomContainer}>
          <HStack>
            <Box>
              <Text mb="6px" color={"gray"}>
                Duration
              </Text>
              <div className={styles.selector}>
                <Select placeholder="Duration">
                  <option value="24">1 day</option>
                  <option value="72">3 days</option>
                  <option value="168">7 days</option>
                  <option value="720">1 month</option>
                </Select>
              </div>
            </Box>

            <Box>
              <Text mb="6px" color={"gray"}>
                Tip
              </Text>
              <InputGroup className={styles.input}>
                <NumberInput step={0.05} defaultValue={0.05} min={0}>
                  <NumberInputField />
                </NumberInput>
              </InputGroup>
            </Box>
          </HStack>

          <Spacer style={{ width: "550px" }} />

          <VStack>
            <Button
              onClick={createSeaportOrder}
              disabled={
                !accountData?.address ||
                offerItems.length === 0 ||
                considerationItems.length === 0
              }
              className={styles.confirmListingButton}
            >
              Confirm Listing
            </Button>
            {txnsuccess && (
              <div style={{ color: "white" }}>YOUR LISTING WAS SUCCESSFUL!</div>
            )}
          </VStack>
        </HStack>
      </main>
    </div>
  );
};

export default Home;

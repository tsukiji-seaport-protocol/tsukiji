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
import {
  OfferItem,
  ConsiderationItem,
  OrderWithMetadata,
} from "types/tokenTypes";
import { NavBar } from "../components/NavBar";
import { TokenSelection } from "@components/TokenSelection";
import { ItemType } from "@opensea/seaport-js/lib/constants";

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

const dummyData = [
  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
      identifier: 582,
    },
    name: "Azuki #582",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/1.png",
    token_id: "582",
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    collectionName: "Azuki",
    symbol: "AZUKI",
  },
  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
      identifier: 2294,
    },
    name: "Punk #2294",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/10.png",
    token_id: "326",
    address: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
    collectionName: "CryptoPunks",
    symbol: "PUNK",
  },
  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
      identifier: 68,
    },
    name: "Doodle #68",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/2.png",
    token_id: "68",
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    collectionName: "Doodles",
    symbol: "DOODLE",
  },
  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
      identifier: 1478,
    },
    name: "MAYC #1478",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/21.png",
    token_id: "1478",
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    collectionName: "Mutant Ape Yacht Club",
    symbol: "MAYC",
  },
  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
      identifier: 2938,
    },
    name: "Azuki #2938",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/8.jpg",
    token_id: "2938",
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    collectionName: "Azuki",
    symbol: "AZUKI",
  },

  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
      identifier: 24,
    },
    name: "Punk #24",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/9.png",
    token_id: "24",
    address: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
    collectionName: "CryptoPunks",
    symbol: "PUNK",
  },

  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
      identifier: 8482,
    },
    name: "Doodle #8482",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/7.png",
    token_id: "8482",
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    collectionName: "Doodles",
    symbol: "DOODLE",
  },

  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
      identifier: 3859,
    },
    name: "Punk #3859",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/22.png",
    token_id: "3859",
    address: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
    collectionName: "CryptoPunks",
    symbol: "PUNK",
  },

  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
      identifier: 13,
    },
    name: "Azuki #13",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/17.jpg",
    token_id: "13",
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    collectionName: "Azuki",
    symbol: "AZUKI",
  },
  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
      identifier: 2084,
    },
    name: "Doodles #2084",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/5.png",
    token_id: "2084",
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    collectionName: "Doodles",
    symbol: "DOODLE",
  },
];

const Home: NextPage = () => {
  const { data: accountData } = useAccount();

  const [order, setOrder] = useState<OrderWithCounter>();
  const [offerItems, setOfferItems] = useState<OfferItem[]>([]);

  const [considerationItems, setConsiderationItems] = useState<
    ConsiderationItem[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [txnsuccess, setTxnSuccess] = useState<boolean>(false);

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  const seaport = new Seaport(ethersProvider as any);

  const createSeaportOrder = async () => {
    if (!accountData) throw Error("No address found");
    setLoading(true);

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

    const orderToSave: OrderWithMetadata = {
      order: res,
      offers: offerItems,
      considerations: considerationItems,
    };

    await saveOrder(orderToSave);
    setTxnSuccess(true);
    setLoading(false);
  };

  const saveOrder = useCallback(async (order: OrderWithMetadata) => {
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
              fontSize="2xl"
              size="lg"
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

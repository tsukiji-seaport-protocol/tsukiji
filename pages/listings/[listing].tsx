import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ERC20Amount, InputItem } from "types/tokenTypes";
import styles from "@styles/TokenSelection2.module.css";
import { Input } from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { Spinner } from "@chakra-ui/react";
import { providers } from "ethers";
import { Seaport } from "@opensea/seaport-js";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { useAccount } from "wagmi";

interface TokenSelectionProps {
  title: string;
  isOffer: boolean;
  setItems: (
    value: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  items: InputItem[];
}

const TokenSelection = () => {
  const {
    isOpen,
    onOpen: openAddTokenModal,
    onClose: closeAddTokenModal,
  } = useDisclosure();

  const { data: accountData, isError, isLoading } = useAccount();

  const data: OrderWithCounter = {
    signature:
      "0x6e25c0129d70734a1fa012b82b5ee3c7c6d90d8d40b0f1987858f1bbe8a038028b3e0a2329c47e270201fa5a750402fd503bdecfc89092cd587cad300cdf133d",
    parameters: {
      orderType: 0,
      totalOriginalConsiderationItems: 1,
      endTime:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      startTime: "1656246191",
      salt: "0x0b5e5e864d631e0ce923a6386356560c",
      zoneHash:
        "0x3000000000000000000000000000000000000000000000000000000000000000",
      offer: [
        {
          identifierOrCriteria: "10",
          token: "0xf31c19b1e821ebe74be2e0e0ab5d18748726ce00",
          endAmount: "1",
          itemType: 2,
          startAmount: "1",
        },
        {
          startAmount: "1",
          token: "0xf31c19b1e821ebe74be2e0e0ab5d18748726ce00",
          itemType: 2,
          endAmount: "1",
          identifierOrCriteria: "9",
        },
        {
          identifierOrCriteria: "8",
          itemType: 2,
          startAmount: "1",
          token: "0xf31c19b1e821ebe74be2e0e0ab5d18748726ce00",
          endAmount: "1",
        },
        {
          token: "0xf31c19b1e821ebe74be2e0e0ab5d18748726ce00",
          startAmount: "1",
          itemType: 2,
          endAmount: "1",
          identifierOrCriteria: "7",
        },
        {
          itemType: 2,
          token: "0xb22cfe912f534767276cb2189c7c12d131808669",
          startAmount: "1",
          endAmount: "1",
          identifierOrCriteria: "9",
        },
        {
          token: "0xb22cfe912f534767276cb2189c7c12d131808669",
          startAmount: "1",
          identifierOrCriteria: "8",
          itemType: 2,
          endAmount: "1",
        },
        {
          endAmount: "1",
          identifierOrCriteria: "6",
          startAmount: "1",
          token: "0xf31c19b1e821ebe74be2e0e0ab5d18748726ce00",
          itemType: 2,
        },
      ],
      conduitKey:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      counter: 0,
      zone: "0x0000000000000000000000000000000000000000",
      offerer: "0x439440B818Cac3380aB2d9923F45b675BbA0CB18",
      consideration: [
        {
          identifierOrCriteria: "1",
          itemType: 2,
          endAmount: "1",
          token: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
          startAmount: "1",
          recipient: "0x17e547d79C04D01E49fEa275Cf32ba06554f9dF7",
        },
      ],
    },
  };

  // TODO: remove hard code
  const [eth, setETH] = useState<ERC20Amount>({
    address: "",
    name: " eth",
    amount: "0",
  });

  const addNewToken = () => {
    closeAddTokenModal();
  };

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  const seaport = new Seaport(ethersProvider as any);

  const fulfillSeaportOrder = async () => {
    if (!accountData) throw Error("No address found");
    setLoading(true);

    try {
      let transactionHash: string;

      const { executeAllActions } = await seaport.fulfillOrder({
        order: data,
        accountAddress: accountData.address,
      });

      const transaction = await executeAllActions();
      setLoading(false);
      transactionHash = transaction.hash;
      return transactionHash;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className={styles.tokenSelectionContainer}>
        <h1 className={styles.title}>
          {`OFFER TO EXCHANGE BY ${abridgeAddress(
            "0x439440B818Cac3380aB2d9923F45b675BbA0CB18"
          )}`}{" "}
        </h1>

        <VStack className={styles.itemListContainer}>
          <div className={styles.considerationItem}>
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/1st.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/2nd.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/3rd.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/4th.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/5th.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/6th.png"}
            />
            <Image
              alt="shaddap"
              className={styles.offerImageCardAlice}
              src={"/assets/7th.png"}
            />
            <div style={{ color: "white", padding: "1rem" }}>
              Token Bundle: 2 BAYC, 5 MAYC, ETH
            </div>
          </div>
        </VStack>
        <VStack className={styles.itemListContainer}>
          <div className={styles.considerationItem}>
            <Image
              alt="shaddap"
              className={styles.considerationItemImg}
              src={"/assets/alien.png"}
            />
            <div style={{ color: "white", padding: "1rem" }}>
              Token Name: PUNK #1
            </div>
          </div>
        </VStack>

        <Button
          className={styles.addAssetButton}
          variant=""
          onClick={fulfillSeaportOrder}
        >
          {!loading ? "FULFILL PURCHASE" : <Spinner></Spinner>}
        </Button>
      </div>
    </>
  );
};

type ListItemProps = {
  item: InputItem;
  isLight: boolean;
  removeItem: (address: string, tokenId: string) => void;
};

const ListItem = ({ item, isLight, removeItem }: ListItemProps) => {
  return (
    <HStack
      className={`${styles.listItemContainer} ${isLight && styles.light}`}
    >
      <Image
        alt="nft placeholder"
        src={item.image_url}
        width={50}
        height={50}
        className={styles.listItemImage}
      />
      <VStack className={styles.listItemLabel}>
        <div className={styles.listItemTitle}>{item.collectionName}</div>

        <div
          className={styles.listItemSubtitle}
        >{`Token ID: ${item.token_id}`}</div>
      </VStack>

      <div className={styles.listItemQuantity}>{`1 ${item.symbol}`}</div>

      <IconButton
        className={styles.listItemRemoveIcon}
        colorScheme=""
        aria-label="Search database"
        icon={<SmallCloseIcon />}
        onClick={() => removeItem(item.address, item.token_id)}
      />
    </HStack>
  );
};

export default TokenSelection;

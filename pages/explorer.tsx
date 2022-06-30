import { Button, HStack, VStack, IconButton } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ERC20Amount, InputItem } from "types/tokenTypes";
import styles from "@styles/Explorer.module.css";
import { Input } from "@chakra-ui/react";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import {
  CreateInputItem,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { abridgeAddress } from "@utils/abridgeAddress";

// type Order = {
//   timestamp: string;
//   offerer: string;
//   numberOfConsiderationItems: number;
//   numberOfOfferItems: number;
//   estimatedValue: number;
//   orderTip: number;
//   signature: string;
// };

const dummyOrders: Order[] = [
  {
    timestamp: "12435899776",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "08745767",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
  {
    timestamp: "123",
    offerer: "0x0000",
    numberOfConsiderationItems: 9,
    numberOfOfferItems: 3,
    estimatedValue: 100000,
    orderTip: 10000,
    signature: "verified",
  },
];

const OrderExplorer = () => {
  const [orders, setOrders] = useState<OrderWithCounter[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("here?");
      try {
        const response = await fetch(`/api/orders`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();

        console.log("data: ", data);
        setOrders(data);
      } catch (err) {
        console.log("Error request: ", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className={styles.tokenSelectionContainer}>
      <h1 className={styles.title}>TSUKIJI ORDER EXPLORER</h1>

      <VStack className={styles.itemListContainer}>
        <HStack className={styles.itemListHeader}>
          <div className={styles.listItemTitle}>Offerer</div>
          <div className={styles.listItemTitle}>Start Time</div>
          <div className={styles.listItemTitle}># of Offers</div>
          <div className={styles.listItemTitle}># of Considerations</div>
          <div className={styles.listItemTitle}>Estimated Value</div>
          <div className={styles.listItemTitle}>Payload Signature</div>
        </HStack>
        {orders.map((order, idx) => (
          <ListItem
            key={idx}
            item={order}
            isLight={idx % 2 === 0 ? false : true}
          />
        ))}
      </VStack>

      <Button className={styles.addAssetButton} variant="" onClick={() => {}}>
        DOWNLOAD CSV
      </Button>
    </div>
  );
};

type ListItemProps = {
  item: OrderWithCounter;
  isLight: boolean;
};

const ListItem = ({ item, isLight }: ListItemProps) => {
  return (
    <HStack
      className={`${styles.listItemContainer} ${isLight && styles.light}`}
    >
      {/* <VStack className={styles.listItemLabel}> */}
      <div className={styles.listItemTitle}>
        {abridgeAddress(item.parameters.offerer)}
      </div>
      <div className={styles.listItemTitle}>
        {item.parameters.startTime.toString()}
      </div>
      <div className={styles.listItemTitle}>{item.parameters.offer.length}</div>
      <div className={styles.listItemTitle}>
        {item.parameters.consideration.length}
      </div>
      <div className={styles.listItemTitle}>
        {`$${(Math.random() * 3000 + 9000).toFixed(2)}`}
      </div>
      <div className={styles.listItemTitle}>
        {abridgeAddress(item.signature)}
      </div>
      {/*
        <div
          className={styles.listItemSubtitle}
        >{`Token ID: ${item.token_id}`}</div> */}
      {/* </VStack> */}

      {/* <IconButton
        className={styles.listItemRemoveIcon}
        colorScheme=""
        aria-label="Search database"
        icon={<SmallCloseIcon />}
        onClick={() => removeItem(item.address, item.token_id)}
      /> */}
    </HStack>
  );
};

export default OrderExplorer;

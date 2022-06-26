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
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { ERC20Amount, InputItem } from "types/tokenTypes";
import styles from "@styles/Explorer.module.css";
import { Input } from "@chakra-ui/react";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { CreateInputItem } from "@opensea/seaport-js/lib/types";

type Order = {
  timestamp: string;
  offerer: string;
  numberOfConsiderationItems: number;
  numberOfOfferItems: number;
  estimatedValue: number;
  orderTip: number;
  signature: string;
};

const orders: Order[] = [
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
  return (
    <div className={styles.tokenSelectionContainer}>
      <h1 className={styles.title}>TSUKIJI ORDER EXPLORER</h1>

      <VStack className={styles.itemListContainer}>
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
  item: Order;
  isLight: boolean;
};

const ListItem = ({ item, isLight }: ListItemProps) => {
  return (
    <HStack
      className={`${styles.listItemContainer} ${isLight && styles.light}`}
    >
      {/* <VStack className={styles.listItemLabel}> */}
      <div className={styles.listItemTitle}>{item.timestamp}</div>
      <div className={styles.listItemTitle}>{item.offerer}</div>
      <div className={styles.listItemTitle}>
        {item.numberOfConsiderationItems}
      </div>
      <div className={styles.listItemTitle}>{item.numberOfOfferItems}</div>
      <div className={styles.listItemTitle}>{item.estimatedValue}</div>
      <div className={styles.listItemTitle}>{item.orderTip}</div>
      {/* 
        <div
          className={styles.listItemSubtitle}
        >{`Token ID: ${item.token_id}`}</div> */}
      {/* </VStack> */}

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

export default OrderExplorer;

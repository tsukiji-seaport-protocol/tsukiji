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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { NFTViewer } from "./web3/NFTViewer";
import { useState } from "react";
import { ERC20Viewer } from "./web3/ERC20Viewer";
import { ERC20Amount, InputItem } from "types/tokenTypes";
import styles from "@styles/TokenSelection.module.css";
import { Input } from "@chakra-ui/react";
import { ItemType } from "@opensea/seaport-js/lib/constants";

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

interface TokenSelectionProps {
  title: string;
  isOffer: boolean;
  setItems: (
    value: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  items: InputItem[];
  account?: string;
}

const TokenSelection = ({
  title,
  isOffer,
  setItems,
  items,
  account,
}: TokenSelectionProps) => {
  const {
    isOpen,
    onOpen: openAddTokenModal,
    onClose: closeAddTokenModal,
  } = useDisclosure();

  // TODO: remove hard code
  const [eth, setETH] = useState<ERC20Amount>({
    address: "",
    name: " eth",
    amount: "0",
  });

  const addNewToken = () => {
    closeAddTokenModal();
  };

  const removeItem = (address: string, tokenId: string) => {
    const filteredItems = items.filter(
      (token) =>
        `${token.address}-${token.token_id}` !== `${address}-${tokenId}`
    );
    setItems(filteredItems);
  };

  return (
    <>
      <div className={styles.tokenSelectionContainer}>
        <h1 className={styles.title}>{title}</h1>

        <VStack className={styles.itemListContainer}>
          {items.map((item, idx) => (
            <ListItem
              key={`${item.address}-${item.token_id}`}
              item={item}
              isLight={idx % 2 === 0 ? false : true}
              removeItem={removeItem}
            />
          ))}
        </VStack>

        <Button
          className={styles.addAssetButton}
          variant=""
          onClick={openAddTokenModal}
          disabled={!account}
        >
          ADD ASSETS
        </Button>
      </div>

      {/* Popup Modal */}
      <Modal isOpen={isOpen} size="5xl" onClose={closeAddTokenModal}>
        <ModalOverlay className={styles.modalOverlay} />
        <ModalContent className={styles.modalContent}>
          <ModalBody className={styles.modalBody}>
            <Tabs isFitted>
              <TabList>
                <Tab className={styles.tab}>ERC721</Tab>
                <Tab className={styles.tab}>ERC20</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <NFTViewer
                    items={items}
                    setItems={setItems}
                    isOffer={isOffer}
                  />
                </TabPanel>
                <TabPanel>
                  <ERC20Viewer {...{ eth, setETH }} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter width={"100%"} alignContent="space-between">
            <Input
              style={{ color: "white" }}
              placeholder="Search Contract Address"
            />
            <Text
              px={3}
              fontStyle="italic"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              {items.length} NFTs selected
            </Text>
            <Button colorScheme="white" mr={3} onClick={addNewToken} pl={4}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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

export { TokenSelection };

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { NFTViewer } from "./web3/NFTViewer";
import { useState } from "react";
import { CurrencyViewer } from "./web3/CurrencyViewer";
import { InputItem } from "types/tokenTypes";
import styles from "@styles/TokenSelection.module.css";
import { Input } from "@chakra-ui/react";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { createConsiderationItem, createOfferItem } from "@utils/createItem";
import { useBalance } from "wagmi";
import { NFTConsiderationViewer } from "./web3/NFTConsiderationViewer";
import { formatEther, parseEther } from "ethers/lib/utils";

const WETH_ADDRESS = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

interface TokenSelectionProps {
  title: string;
  isOffer: boolean;
  setItems: (
    value: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  items: InputItem[];
  account: string;
  isWETH: boolean;
}

const TokenSelection = ({
  title,
  isOffer,
  setItems,
  items,
  account,
  isWETH,
}: TokenSelectionProps) => {
  const { data: ethData, isSuccess: isEthSuccess } = useBalance({
    addressOrName: account,
  });

  const { data: wethData, isSuccess: isWethSuccess } = useBalance({
    addressOrName: account,
    token: WETH_ADDRESS,
  });

  const [tab, setTab] = useState<string>("ERC721");
  const [searchText, setSearchText] = useState<string>("");

  const [currencyAmount, setCurrencyAmount] = useState<string>("0");
  // const [ethAmount, setEthAmount] = useState<string>("0");
  // const [wethAmount, setWethAmount] = useState<string>("0");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleCurrencyInput = (value: string) => {
    if (isOffer && isEthSuccess && Number(ethData!.formatted) < Number(value)) {
      setErrorMessage("Insufficient Funds: ETH");
    } else {
      setErrorMessage("");
    }
    setCurrencyAmount(value);
  };

  const {
    isOpen,
    onOpen: openAddTokenModal,
    onClose: closeAddTokenModal,
  } = useDisclosure();

  const loadTokens = () => {
    if (Number(currencyAmount)) {
      let CurrencyItem: InputItem;

      if (!isWETH) {
        const newItems = items.filter(({ type }) => type !== ItemType.NATIVE);

        const formattedAmount = parseEther(currencyAmount).toString();

        if (isOffer) {
          CurrencyItem = createOfferItem(
            ItemType.NATIVE,
            "Ethereum",
            "assets/eth.svg",
            "ETH",
            formattedAmount
          );
        } else {
          CurrencyItem = createConsiderationItem(
            ItemType.NATIVE,
            "Ethereum",
            "assets/eth.svg",
            "ETH",
            formattedAmount,
            account
          );
        }

        setItems([...newItems, CurrencyItem]);
      } else {
        const newItems = items.filter(({ type }) => type !== ItemType.ERC20);

        const formattedAmount = parseEther(currencyAmount).toString();

        if (isOffer) {
          CurrencyItem = createOfferItem(
            ItemType.ERC20,
            "Wrapped Ethereum",
            "assets/weth.png",
            "WETH",
            formattedAmount,
            WETH_ADDRESS
          );
        } else {
          CurrencyItem = createConsiderationItem(
            ItemType.ERC20,
            "Wrapped Ethereum",
            "assets/weth.png",
            "WETH",
            formattedAmount,
            account,
            WETH_ADDRESS
          );
        }
        setItems([...newItems, CurrencyItem]);
      }
    }
    closeAddTokenModal();
  };

  const openModal = () => {
    setSearchText("");
    setCurrencyAmount("");
    setTab("ERC721");
    openAddTokenModal();
  };

  const removeItem = (address: string, tokenId: string) => {
    const filteredItems = items.filter(
      (token) =>
        `${token.address}-${token.token_id}` !== `${address}-${tokenId}`
    );
    setItems(filteredItems);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
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
          onClick={openModal}
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
                <Tab className={styles.tab} onClick={() => setTab("ERC721")}>
                  ERC721
                </Tab>
                <Tab className={styles.tab} onClick={() => setTab("ERC20")}>
                  Currency
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={styles.tabPanel}>
                  {isOffer ? (
                    <NFTViewer
                      items={items}
                      setItems={setItems}
                      isOffer={isOffer}
                      searchText={searchText}
                      account={account}
                    />
                  ) : (
                    <NFTConsiderationViewer
                      items={items}
                      setItems={setItems}
                      isOffer={isOffer}
                      searchText={searchText}
                      account={account}
                    />
                  )}
                </TabPanel>
                <TabPanel>
                  <CurrencyViewer
                    {...{
                      isWETH,
                      currencyAmount,
                      handleCurrencyInput,
                      errorMessage,
                    }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter width={"100%"} alignContent="space-between">
            {tab === "ERC721" && (
              <Input
                style={{ color: "white" }}
                placeholder={
                  isOffer
                    ? "Search by Collection Name"
                    : "Search by Contract Address"
                }
                value={searchText}
                onChange={handleSearch}
              />
            )}
            <Text
              px={3}
              fontStyle="italic"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              {tab === "ERC721" && `${items.length} NFTs selected`}
            </Text>
            <Button
              colorScheme="white"
              mr={3}
              onClick={loadTokens}
              pl={4}
              disabled={!!errorMessage}
            >
              Add
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
  const isNFT = item.type === ItemType.ERC721;

  const { name, collectionName, address, token_id, inputItem, symbol } = item;

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
        <div className={styles.listItemTitle}>
          {isNFT ? collectionName : name}
        </div>

        <div className={styles.listItemSubtitle}>
          {isNFT ? `Token ID: ${token_id}` : ""}
        </div>
      </VStack>

      <div className={styles.listItemQuantity}>
        {isNFT ? `1 ${symbol}` : `${formatEther(inputItem.amount)} ${symbol}`}
      </div>

      <IconButton
        className={styles.listItemRemoveIcon}
        colorScheme=""
        aria-label="Search database"
        icon={<SmallCloseIcon />}
        onClick={() => removeItem(address, token_id)}
      />
    </HStack>
  );
};

export { TokenSelection };

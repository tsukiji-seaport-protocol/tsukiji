import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  VStack,
  Text,
  Center,
  Divider,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { InputItem } from "types/tokenTypes";
import styles from "@styles/NFTConsiderationViewer.module.css";
import { createOfferItem, createConsiderationItem } from "@utils/createItem";
import { pinnedCollections } from "@constants/pinnedCollections";

interface NFTViewerCardProps {
  imageUrl: string;
  name: string;
  tokenId: string;
  contractAddress: string;
  collectionName: string;
  items: InputItem[];
  setItems: (
    tokens: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  isOffer: boolean;
  symbol: string;
  recipient: string;
}

const NFTViewerCard = ({
  imageUrl,
  name,
  tokenId,
  contractAddress,
  collectionName,
  items,
  setItems,
  isOffer,
  symbol,
  recipient,
}: NFTViewerCardProps) => {
  const selected = !!items.find(
    (token) =>
      `${token.address}-${token.token_id}` === `${contractAddress}-${tokenId}`
  );

  const selectNFT = () => {
    if (selected) {
      // remove if already selected
      setItems((prev: InputItem[]) =>
        prev.filter(
          ({ address, token_id }: InputItem) =>
            `${address}-${token_id}` != `${contractAddress}-${tokenId}`
        )
      );
    } else {
      // select if not
      setItems((prev: InputItem[]) => [
        ...prev,
        isOffer
          ? createOfferItem(
              ItemType.ERC721,
              name,
              imageUrl,
              symbol,
              "1",
              contractAddress,
              collectionName,
              tokenId
            )
          : createConsiderationItem(
              ItemType.ERC721,
              name,
              imageUrl,
              symbol,
              "1",
              recipient,
              contractAddress,
              collectionName,
              tokenId
            ),
      ]);
    }
  };

  return (
    <Box
      as="button"
      overflow="hidden"
      _hover={{ bg: "gray.600", transform: "scale(1.02)", opacity: 0.95 }}
      padding={2}
      borderRadius="m"
      background={selected ? "gray.600" : ""}
      onClick={selectNFT}
    >
      <VStack spacing={2}>
        <>
          {imageUrl ? (
            <Image
              alt={name}
              rounded={"lg"}
              height={230}
              width={230}
              objectFit={"cover"}
              src={imageUrl}
            />
          ) : (
            <Image
              alt="nft placeholder"
              rounded={"lg"}
              height={230}
              width={230}
              objectFit={"cover"}
              src={"/assets/doggo.png"}
            />
          )}
        </>
        <div style={{ color: "white" }}>
          {name ? name : `${symbol} #${tokenId}`}
        </div>
      </VStack>
    </Box>
  );
};

interface NFTViewerProps {
  items: InputItem[];
  setItems: (
    tokens: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  isOffer: boolean;
  searchText: string;
  account: string;
}

export const NFTConsiderationViewer = ({
  items,
  setItems,
  isOffer,
  searchText,
  account,
}: NFTViewerProps) => {
  const [fetchedCollections, setFetchedCollections] = useState<any[]>([]);
  const [fetchedTokens, setFetchedTokens] = useState<any[]>([]);
  const [isCollectionsLoading, setIsCollectionsLoading] =
    useState<boolean>(false);
  const [isTokensLoading, setIsTokensLoading] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  const filteredCollection = fetchedCollections.filter((coll) => {
    if (
      coll.primary_asset_contracts &&
      coll.primary_asset_contracts[0] &&
      coll.primary_asset_contracts[0].total_supply !== "0"
    )
      return coll;
  });

  const aggregatedCollections =
    searchText.length > 40
      ? fetchedCollections
      : [...pinnedCollections, ...filteredCollection];

  useEffect(
    function fetchCollections() {
      setIsCollectionsLoading(true);

      const requestHeaders: HeadersInit = {
        Accept: "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY ?? "",
      };

      const requestOptions: RequestInit = {
        method: "GET",
        headers: requestHeaders,
      };

      const fetchData = async () => {
        try {
          let response;
          if (searchText.length > 40) {
            response = await fetch(
              `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${searchText}&order_direction=desc&offset=0&limit=50&include_orders=false`,
              requestOptions
            );
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
            const { assets } = await response.json();
            const { asset_contract, image_url } = assets[0];
            asset_contract.image_url = image_url;
            setFetchedCollections([asset_contract]);
            console.log("assets: ", assets);
          } else {
            response = await fetch(
              "https://testnets-api.opensea.io/api/v1/collections?offset=0&limit=300",
              requestOptions
            );
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
            const { collections } = await response.json();

            setFetchedCollections(collections);
            console.log("fetched collections: ", collections);
          }
        } catch (err) {
          console.log(`Error fetching collections from Opensea: ${err}`);
          return new Error(`Error fetching collections from Opensea: ${err}`);
        }
        setIsCollectionsLoading(false);
      };

      fetchData();
    },
    [searchText]
  );

  const fetchCollectionTokens = useCallback(async (address: string) => {
    setIsTokensLoading(true);
    const requestHeaders: HeadersInit = {
      Accept: "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY ?? "",
    };

    const requestOptions: RequestInit = {
      method: "GET",
      headers: requestHeaders,
    };
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${address}&order_direction=desc&offset=0&limit=50&include_orders=false`,
        requestOptions
      );
      const { assets } = await response.json();

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      console.log("fetched data: ", assets);
      setFetchedTokens(assets);
    } catch (err) {
      console.log(`Error fetching collections from Opensea: ${err}`);
      return new Error(`Error fetching collections from Opensea: ${err}`);
    }
    setIsTokensLoading(false);
  }, []);

  const handleSelectCollection = async (address: string) => {
    setSelectedCollection(address);
    fetchCollectionTokens(address);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collectionGrid}>
        {isCollectionsLoading ? (
          <Box width="100%" display="flex" justifyContent="center">
            <Spinner color="white" />
          </Box>
        ) : (
          aggregatedCollections.map((coll) => {
            const contractAddress =
              coll.primary_asset_contracts && coll.primary_asset_contracts[0]
                ? coll.primary_asset_contracts[0].address
                : coll.address;

            return (
              <HStack
                key={contractAddress}
                className={`${styles.collectionRow} ${
                  coll.address === selectedCollection
                    ? styles.selectedCollection
                    : ""
                }`}
                onClick={() => handleSelectCollection(contractAddress)}
              >
                {coll.image_url ? (
                  <Image
                    alt={coll.name}
                    rounded={"lg"}
                    height={50}
                    width={50}
                    borderRadius="100%"
                    objectFit={"cover"}
                    src={coll.image_url}
                  />
                ) : (
                  <Image
                    alt="nft placeholder"
                    rounded={"lg"}
                    height={50}
                    width={50}
                    borderRadius="100%"
                    objectFit={"cover"}
                    src={"/assets/poggo.jpg"}
                  />
                )}
                <Text paddingLeft={"1rem"}>{coll.name}</Text>
              </HStack>
            );
          })
        )}
      </div>
      <Center height="540px">
        <Divider orientation="vertical" opacity=".4" />
      </Center>
      <div className={styles.tokenGrid}>
        {isTokensLoading ? (
          <Box width="100%" display="flex" justifyContent="center">
            <Spinner color="white" />
          </Box>
        ) : (
          <SimpleGrid
            columns={[2]}
            spacing={5}
            maxHeight={"50vh"}
            paddingLeft="1rem"
          >
            {fetchedTokens.map(
              ({ name, image_url, token_id, asset_contract }) => (
                <NFTViewerCard
                  key={`${asset_contract.address}-${token_id}`}
                  {...{
                    name,
                    imageUrl: image_url,
                    tokenId: token_id,
                    contractAddress: asset_contract.address,
                    collectionName: asset_contract.name,
                    items,
                    setItems,
                    isOffer,
                    symbol: asset_contract.symbol,
                    recipient: account,
                  }}
                />
              )
            )}
          </SimpleGrid>
        )}
      </div>
    </div>
  );
};

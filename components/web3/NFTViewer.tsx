import { Box, Image, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { useEffect, useState } from "react";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { InputItem } from "types/tokenTypes";
import styles from "@styles/TokenSelection.module.css";
import { createOfferItem, createConsiderationItem } from "@utils/createItem";

interface ImageSelectProps {
  imageUrl: string;
  name: string;
}

const ImageSelect = ({ imageUrl, name }: ImageSelectProps) => {
  return (
    <>
      {imageUrl && (
        <Image
          alt={name}
          rounded={"lg"}
          height={230}
          width={230}
          objectFit={"cover"}
          src={imageUrl}
        />
      )}
      {!imageUrl && (
        <Image
          alt="nft placeholder"
          rounded={"lg"}
          height={230}
          width={230}
          objectFit={"cover"}
          src={"/assets/nftplaceholder.jpg"}
        />
      )}
    </>
  );
};

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
  recipient?: string;
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
  recipient = "",
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
        <ImageSelect imageUrl={imageUrl} name={name} />
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

export const NFTViewer = ({
  items,
  setItems,
  isOffer,
  searchText,
  account,
}: NFTViewerProps) => {
  const [fetchedTokens, setFetchedTokens] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredTokens = fetchedTokens.filter((token) =>
    token.collection.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(
    function fetchData() {
      setIsLoading(true);

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
          const response = await fetch(
            `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&limit=200&include_orders=false`,
            requestOptions
          );
          const { assets } = await response.json();
          setFetchedTokens(assets);
        } catch (err) {
          console.log(`Error fetching assets from Opensea: ${err}`);
          return new Error(`Error fetching assets from Opensea: ${err}`);
        }
        setIsLoading(false);
      };

      fetchData();
    },
    [account, isOffer]
  );

  return (
    <div className={styles.grid}>
      {fetchedTokens.length === 0 && (
        <Box className={styles.noTokensMessage}>
          {"Oops, looks like you don't own any tokens."}
        </Box>
      )}
      {isLoading ? (
        <Box width="100%" display="flex" justifyContent="center">
          <Spinner color="white" />
        </Box>
      ) : (
        fetchedTokens && (
          <SimpleGrid columns={[2, 3, 4]} spacing={5} maxHeight={"50vh"}>
            {isOffer
              ? filteredTokens.map(
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
                )
              : filteredTokens.map(
                  ({
                    name,
                    image_url,
                    token_id,
                    address,
                    collectionName,
                    symbol,
                  }) => (
                    <NFTViewerCard
                      key={`${address}-${token_id}`}
                      {...{
                        name,
                        imageUrl: image_url,
                        tokenId: token_id,
                        contractAddress: address,
                        collectionName: collectionName,
                        items,
                        setItems,
                        isOffer,
                        symbol: symbol,
                      }}
                    />
                  )
                )}
          </SimpleGrid>
        )
      )}
      {searchText && filteredTokens.length === 0 && (
        <Box className={styles.noResultMessage}>
          {
            "Sorry, we couldn't find any tokens in your wallet for your search :("
          }
        </Box>
      )}
    </div>
  );
};

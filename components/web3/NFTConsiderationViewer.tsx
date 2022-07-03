import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  VStack,
  Text,
} from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { useCallback, useEffect, useState } from "react";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { InputItem } from "types/tokenTypes";
import styles from "@styles/NFTConsiderationViewer.module.css";
import { createOfferItem, createConsiderationItem } from "@utils/createItem";

const Azuki = {
  name: "Azuki",
  image_url:
    "https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s168",
  address: "0xae6Bbc3C94D1A6C086AF6a9774B4434A58C793bf",
};
const BAYC = {
  name: "Bored Ape Yacht Club",
  image_url:
    "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s168",
  address: "0xF865E7c71432EE1c57047f6280c2de39214b5b7A",
};
const CoolCats = {
  name: "Cool Cats",
  image_url:
    "https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s168",
  address: "0x3dAd63203f1A62724DAcb6A473fE9AE042e2ecc3",
};
const MAYC = {
  name: "Mutant Ape Yacht Club",
  image_url:
    "https://lh3.googleusercontent.com/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI=s168",
  address: "0xf0d554b751fE43f1A80dd693A30583f041bAc3A5",
};
const Doodles = {
  name: "Doodles",
  image_url:
    "https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s168",
  address: "0xF6e19DBFdc5a86648c6174c860964F901712c1C4",
};
const Goblintown = {
  name: "Goblintown",
  image_url:
    "https://lh3.googleusercontent.com/cb_wdEAmvry_noTfeuQzhqKpghhZWQ_sEhuGS9swM03UM8QMEVJrndu0ZRdLFgGVqEPeCUzOHGTUllxug9U3xdvt0bES6VFdkRCKPqg=s168",
  address: "0x16fF7dca5A520841e646AF9C927F32F56419c16c",
};
const Meebits = {
  name: "Meebits",
  image_url:
    "https://lh3.googleusercontent.com/d784iHHbqQFVH1XYD6HoT4u3y_Fsu_9FZUltWjnOzoYv7qqB5dLUqpGyHBd8Gq3h4mykK5Enj8pxqOUorgD2PfIWcVj9ugvu8l0=s0",
  address: "0x2fCEb846CFAbd8e26B63256aEd5029F7365af714",
};
const WorldOfWomen = {
  name: "World of Women",
  image_url:
    "https://lh3.googleusercontent.com/EFAQpIktMBU5SU0TqSdPWZ4byHr3hFirL_mATsR8KWhM5z-GJljX8E73V933lkyKgv2SAFlfRRjGsWvWbQQmJAwu3F2FDXVa1C9F=s168",
  address: "0x65d5e1e27159d6758982ac6d2952099D364a33E0",
};
const CloneX = {
  name: "CloneX",
  image_url:
    "https://lh3.googleusercontent.com/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg=s168",
  address: "0x45F59541c942CC7cc2319785c9d39F9b1DF35013",
};
const Coven = {
  name: "Crypto Coven",
  image_url:
    "https://lh3.googleusercontent.com/E8MVasG7noxC0Fa_duhnexc2xze1PzT1jzyeaHsytOC4722C2Zeo7EhUR8-T6mSem9-4XE5ylrCtoAsceZ_lXez_kTaMufV5pfLc3Fk=s0",
  address: "0xA6C71b373E6c6daAb5041B26a9D94EbD6D288A81",
};

const pinnedCollections = [
  Azuki,
  BAYC,
  CoolCats,
  MAYC,
  Doodles,
  Goblintown,
  Meebits,
  WorldOfWomen,
  CloneX,
  Coven,
];

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
        <ImageSelect imageUrl={imageUrl} name={name} />
        <div style={{ color: "white" }}>
          {name ? name : abridgeAddress(contractAddress)}
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  const aggregatedCollections = [...pinnedCollections, ...fetchedCollections];

  useEffect(function fetchCollections() {
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
          "https://testnets-api.opensea.io/api/v1/collections?offset=0&limit=300",
          requestOptions
        );
        const { collections } = await response.json();
        setFetchedCollections(collections);
        console.log("fetched collections: ", collections);
      } catch (err) {
        console.log(`Error fetching collections from Opensea: ${err}`);
        return new Error(`Error fetching collections from Opensea: ${err}`);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const fetchCollectionTokens = async (address: string) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleSelectCollection = async (address: string) => {
    console.log("input address: ", address);
    fetchCollectionTokens(address);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collectionGrid}>
        {isLoading && <Spinner />}
        {aggregatedCollections.map((coll) => (
          <HStack
            key={coll.name}
            className={styles.collectionRow}
            onClick={() =>
              handleSelectCollection(
                coll.primary_asset_contracts
                  ? coll.primary_asset_contracts[0].address
                  : coll.address
              )
            }
            width="50%"
          >
            {coll.image_url && (
              <Image
                alt={coll.name}
                rounded={"lg"}
                height={50}
                width={50}
                borderRadius="100%"
                objectFit={"cover"}
                src={coll.image_url}
              />
            )}
            {!coll.image_url && (
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
        ))}
      </div>
      <div className={styles.tokenGrid}>
        {!fetchedTokens ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={[2]} spacing={5} maxHeight={"50vh"}>
            {fetchedTokens.map(
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

{
  /* {fetchedCollections.length === 0 && (
  <Box className={styles.noTokensMessage}>
    {"Oops, looks like you don't own any tokens."}
  </Box>
)}
{!isLoading && fetchedCollections && (
  <SimpleGrid columns={[2, 3, 4]} spacing={5} maxHeight={"50vh"}>
    {filteredTokens.map(
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
{searchText && filteredTokens.length === 0 && (
  <Box className={styles.noResultMessage}>
    {
      "Sorry, we couldn't find any tokens in your wallet for your search :("
    }
  </Box>
)} */
}

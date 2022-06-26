import {
  Box,
  Image,
  SimpleGrid,
  Spinner,
  StylesProvider,
  VStack,
} from "@chakra-ui/react";
import { abridgeAddress } from "@utils/abridgeAddress";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { InputItem, OfferItem, ConsiderationItem } from "types/tokenTypes";
import {
  CreateInputItem,
  ConsiderationInputItem,
} from "@opensea/seaport-js/lib/types";

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
}: NFTViewerCardProps) => {
  const selected = !!items.find(
    (token) =>
      `${token.address}-${token.token_id}` === `${contractAddress}-${tokenId}`
  );

  const createOfferItem = (
    name: string,
    imageUrl: string,
    contractAddress: string,
    tokenId: string,
    collectionName: string,
    symbol: string
  ): OfferItem => {
    const inputItem: CreateInputItem = {
      itemType: ItemType.ERC721,
      token: contractAddress,
      identifier: tokenId,
    };
    return {
      inputItem,
      name,
      collectionName,
      image_url: imageUrl,
      token_id: tokenId,
      address: contractAddress,
      symbol: symbol,
    };
  };

  const createConsiderationItem = (
    name: string,
    imageUrl: string,
    contractAddress: string,
    tokenId: string,
    collectionName: string,
    symbol: string
  ): ConsiderationItem => {
    const inputItem: ConsiderationInputItem = {
      itemType: ItemType.ERC721,
      token: contractAddress,
      identifier: tokenId,
      recipient: "0x17e547d79C04D01E49fEa275Cf32ba06554f9dF7",
    };
    return {
      inputItem,
      name,
      collectionName,
      image_url: imageUrl,
      token_id: tokenId,
      address: contractAddress,
      symbol: symbol,
    };
  };

  const selectNFT = () => {
    if (selected) {
      // remove if already selected
      setItems((prev: any) =>
        prev.filter((item: InputItem) => item.address != contractAddress)
      );
    } else {
      // select if not
      setItems((prev: any) => [
        ...prev,
        isOffer
          ? createOfferItem(
              name,
              imageUrl,
              contractAddress,
              tokenId,
              collectionName,
              symbol
            )
          : createConsiderationItem(
              name,
              imageUrl,
              contractAddress,
              tokenId,
              collectionName,
              symbol
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
}

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
      token: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
      identifier: 2028,
    },
    name: "Punk #2028",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/12.png",
    token_id: "2028",
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
  {
    inputItem: {
      itemType: ItemType.ERC721,
      token: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
      identifier: 1,
    },
    name: "Punk #1",
    image_url:
      "https://gateway.pinata.cloud/ipfs/QmfDVMnhvkULBUszfb8nVq6uRRPzafVymzJqUsqqSAH4DQ/24.png",
    token_id: "1",
    address: "0xfc3e0d0c54a7b7ea9c5bb976a46dcdbdade7cd3e",
    collectionName: "CryptoPunks",
    symbol: "PUNK",
  },
];

export const NFTViewer = ({ items, setItems, isOffer }: NFTViewerProps) => {
  const [fetchedTokens, setFetchedTokens] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: accountData } = useAccount();

  useEffect(
    function fetchData() {
      if (!isOffer) {
        setFetchedTokens(dummyData);
        return;
      }

      const requestHeaders: HeadersInit = {
        Accept: "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY ?? "",
      };

      const requestOptions: RequestInit = {
        method: "GET",
        headers: requestHeaders,
      };

      const fetchData = async () => {
        setIsLoading(true);
        if (!accountData?.address) {
          setIsLoading(false);
          return;
        }
        try {
          const response = await fetch(
            `https://testnets-api.opensea.io/api/v1/assets?owner=${accountData?.address}&limit=25&include_orders=false`,
            // "https://testnets-api.opensea.io/api/v1/assets?owner=0x50cd8e39e6d1f95a557e34924A2056e5EdEa519a&order_direction=desc&offset=0&limit=20&include_orders=false"
            requestOptions
          );
          const { assets } = await response.json();
          console.log("assets: ", assets);
          setFetchedTokens(assets);
        } catch (err) {
          console.log(`Error fetching assets from Opensea: ${err}`);
          return new Error(`Error fetching assets from Opensea: ${err}`);
        }
        setIsLoading(false);
      };

      fetchData();
    },
    [accountData?.address]
  );

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && fetchedTokens && (
        <SimpleGrid
          columns={[2, 3, 4]}
          spacing={5}
          maxHeight={"50vh"}
          overflow="scroll"
        >
          {isOffer
            ? fetchedTokens.map(
                ({ name, image_url, token_id, asset_contract }) =>
                  image_url && (
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
                      }}
                    />
                  )
              )
            : fetchedTokens.map(
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
      )}
    </>
  );
};

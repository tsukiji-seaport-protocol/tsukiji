import { Box, Image, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import { abridgeAddress } from "pages/utils/abridgeAddress";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { InputItem, OfferItem, ConsiderationItem } from "types/tokenTypes";

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
  items: InputItem[];
  setItems: (
    tokens: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  isOffer: boolean;
}

const NFTViewerCard = ({
  imageUrl,
  name,
  tokenId,
  contractAddress,
  items,
  setItems,
  isOffer,
}: NFTViewerCardProps) => {
  const selected = !!items.find(
    (token) =>
      `${token.address}-${token.token_id}` === `${contractAddress}-${tokenId}`
  );

  const createOfferItem = (
    name: string,
    imageUrl: string,
    contractAddress: string,
    tokenId: string
  ): OfferItem => {
    const inputItem = {
      itemType: ItemType.ERC721,
      token: contractAddress,
      identifier: tokenId,
      amount: "",
    };
    return {
      inputItem,
      name,
      image_url: imageUrl,
      token_id: tokenId,
      address: contractAddress,
    };
  };

  const createConsiderationItem = (
    name: string,
    imageUrl: string,
    contractAddress: string,
    tokenId: string
  ): ConsiderationItem => {
    const inputItem = {
      itemType: ItemType.ERC721,
      token: contractAddress,
      identifier: tokenId,
      amount: "",
      recipient: "",
    };
    return {
      inputItem,
      name,
      image_url: imageUrl,
      token_id: tokenId,
      address: contractAddress,
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
          ? createOfferItem(name, imageUrl, contractAddress, tokenId)
          : createConsiderationItem(name, imageUrl, contractAddress, tokenId),
      ]);
    }
  };

  return (
    <Box
      as="button"
      overflow="hidden"
      _hover={{ bg: "gray.100", transform: "scale(1.02)", opacity: 0.95 }}
      padding={2}
      borderRadius="sm"
      background={selected ? "gray.300" : ""}
      onClick={selectNFT}
    >
      <VStack spacing={2}>
        <ImageSelect imageUrl={imageUrl} name={name} />
        {name && <p>{name}</p>}
        {!name && <p>{abridgeAddress(contractAddress)}</p>}
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

export const NFTViewer = ({ items, setItems, isOffer }: NFTViewerProps) => {
  const [fetchedTokens, setFetchedTokens] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: accountData } = useAccount();

  useEffect(
    function fetchData() {
      const requestHeaders: HeadersInit = {
        Accept: "application/json",
        "X-API-KEY": process.env.OPENSEA_API_KEY ?? "",
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
            `https://testnets-api.opensea.io/api/v1/assets?owner=${accountData?.address}&limit=100&include_orders=false`,
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
    [accountData?.address]
  );

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <SimpleGrid
          columns={[2, 3, 4]}
          spacing={5}
          maxHeight={"60vh"}
          overflow="scroll"
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
                  items,
                  setItems,
                  isOffer,
                }}
              />
            )
          )}
        </SimpleGrid>
      )}
    </>
  );
};

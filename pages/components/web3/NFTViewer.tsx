import { Image, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import { abridgeAddress } from "pages/utils/abridgeAddress";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface NFTSelectProps {
  imageUrl: string;
  name: string;
  tokenId: string;
  contractAddress: object;
}

const NFTSelect = ({ imageUrl, name, tokenId, contractAddress }: NFTSelectProps) => {
  return <>
    <VStack spacing={2}>
      {imageUrl && <Image
        alt="nft preview"
        rounded={"lg"}
        height={230}
        width={230}
        objectFit={"cover"}
        src={imageUrl}
      />}
      {!imageUrl && <Image
        alt="nft preview"
        rounded={"lg"}
        height={230}
        width={230}
        objectFit={"cover"}
        src={'/assets/nftplaceholder.jpg'}
      />}
      {name && <p>{name}</p>}
      {!name && <p>{abridgeAddress(contractAddress.address)}</p>}
    </VStack>
  </>
}

export const NFTViewer = () => {
  const [tokens, setTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: accountData } = useAccount();

  useEffect(function fetchData() {
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
        setTokens(assets);
        console.log(assets)
      } catch (err) {
        console.log(`Error fetching assets from Opensea: ${err}`);
        return new Error(`Error fetching assets from Opensea: ${err}`);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading &&
        <SimpleGrid columns={[2, 3, 4]} spacing={5} maxHeight={'60vh'} overflow="scroll">
          {tokens.map(({ name, image_url, token_id, asset_contract }) => (
            <NFTSelect key="" {...{ name, imageUrl: image_url, tokenId: token_id, contractAddress: asset_contract }} />
          )
          )}
        </SimpleGrid>
      }
    </>
  )
};
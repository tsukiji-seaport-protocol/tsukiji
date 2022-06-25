import { Box, Image, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import { abridgeAddress } from "pages/utils/abridgeAddress";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface ImageSelectProps {
  imageUrl: string;
  name: string;
  selected: boolean;
}
const ImageSelect = ({ imageUrl, name, selected }: ImageSelectProps) => {
  return <>
    {imageUrl && <Image
      alt={name}
      rounded={"lg"}
      height={230}
      width={230}
      objectFit={"cover"}
      src={imageUrl}
    />}
    {!imageUrl && <Image
      alt="nft placeholder"
      rounded={"lg"}
      height={230}
      width={230}
      objectFit={"cover"}
      src={'/assets/nftplaceholder.jpg'}
    />}
  </>
}
interface NFTSelectProps {
  imageUrl: string;
  name: string;
  tokenId: string;
  contractAddress: string;
  selected: boolean;
  selectedTokens: Object;
  setSelectedTokens: Function;
}
const NFTSelect = ({ imageUrl, name, tokenId, contractAddress, selected, selectedTokens, setSelectedTokens }: NFTSelectProps) => {
  const selectNFT = () => {
    if (selected) {
      // remove
      setSelectedTokens((prev: any) => prev.filter((ele: string) => ele != `${contractAddress}-${tokenId}`))
    } else {
      // select
      setSelectedTokens((prev: any) => [...prev, `${contractAddress}-${tokenId}`])
    }
  };

  return <Box
    as='button'
    overflow='hidden'
    _hover={{ bg: "gray.100", transform: "scale(1.02)", opacity: 0.95 }}
    padding={2}
    borderRadius="sm"
    background={selected ? 'gray.300' : ''}
    onClick={selectNFT}
  >
    <VStack spacing={2}>
      <ImageSelect imageUrl={imageUrl} name={name} selected={selected} />
      {name && <p>{name}</p>}
      {!name && <p>{abridgeAddress(contractAddress)}</p>}
    </VStack>
  </Box>
}

interface NFTViewerProps {
  selectedTokens: string[];
  setSelectedTokens: Function;
}

export const NFTViewer = ({ selectedTokens, setSelectedTokens }: NFTViewerProps) => {
  const [tokens, setTokens] = useState([]);
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
          {tokens.map(({ name, image_url, token_id, asset_contract }) => {
            const key = `${asset_contract.address}-${token_id}`;
            const selected = selectedTokens.includes(key);

            return <NFTSelect
              key={`${asset_contract.address}-${token_id}`}
              {...{
                name,
                imageUrl: image_url,
                tokenId: token_id,
                contractAddress: asset_contract.address,
                selected: selected,
                selectedTokens,
                setSelectedTokens,
              }} />
          }
          )}
        </SimpleGrid>
      }
    </>
  )
};
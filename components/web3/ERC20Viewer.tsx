import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { ERC20Amount } from "types/tokenTypes";
import { useAccount, useBalance } from "wagmi";

interface ERC20ViewerProps {
  eth: ERC20Amount;
  setETH: Function;
}

export const ERC20Viewer = ({ eth, setETH }: ERC20ViewerProps) => {
  const { data: accountData } = useAccount();
  const balance = useBalance({
    addressOrName: accountData?.address,
  });

  const handleChange = (value: number | string) => {
    setETH({ value: value });
  };

  return (
    <>
      <VStack maxHeight={"60vh"} overflow="scroll">
        <HStack>
          <Image
            alt="ethereum logo"
            width={50}
            height={50}
            src="/assets/ethereum-eth.svg"
          />
          <Text color={'white'}>ETH</Text>
          <NumberInput
            key="index"
            color="white"
            defaultValue={balance.data?.formatted}
            min={0}
            value={eth.amount}
            onChange={handleChange}
          >
            <NumberInputField />
          </NumberInput>
        </HStack>
      </VStack>
    </>
  );
};

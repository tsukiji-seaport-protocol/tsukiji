import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { ERC20Amount } from "types/tokenTypes";
import { useAccount, useBalance } from "wagmi";

interface ERC20ViewerProps {
  eth: ERC20Amount;
  setETH: Function;
}

export const ERC20Viewer = ({ eth, setETH }: ERC20ViewerProps) => {
  const handleChange = (value: number | string) => {
    setETH({ value: value });
  };

  return (
    <>
      <VStack maxHeight={"60vh"} overflow="scroll">
        <HStack>
          <Image
            alt="WETH logo"
            width={50}
            height={50}
            src="/assets/weth.png"
          />
          <p style={{ color: "white" }}>WETH</p>
          <NumberInput
            key="index"
            defaultValue={""}
            min={0}
            value={eth.amount}
            onChange={handleChange}
            style={{ color: "white" }}
          >
            <NumberInputField />
          </NumberInput>
        </HStack>
        <HStack>
          <Image
            alt="ETH logo"
            width={50}
            height={50}
            src="/assets/ethereum-eth.svg"
          />
          <Text color={'white'}>ETH</Text>
          <NumberInput
            key="index"
            defaultValue={""}
            min={0}
            value={eth.amount}
            onChange={handleChange}
            style={{ color: "white" }}
          >
            <NumberInputField />
          </NumberInput>
        </HStack>
      </VStack>
    </>
  );
};

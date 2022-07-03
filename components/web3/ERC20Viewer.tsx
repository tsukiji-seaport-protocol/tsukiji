import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";

interface ERC20ViewerProps {
  wethData: any;
  handleEthInput: (value: string) => void;
  handleWethInput: (value: string) => void;
  ethAmount: string;
  wethAmount: string;
  errorMessage: string;
}

export const ERC20Viewer = ({
  wethData,
  handleEthInput,
  handleWethInput,
  ethAmount,
  wethAmount,
  errorMessage,
}: ERC20ViewerProps) => {
  return (
    <>
      <VStack maxHeight={"60vh"}>
        <HStack width="350px" padding="1rem" justifyContent="space-between">
          <HStack>
            <Image
              alt="ethereum logo"
              width={50}
              height={50}
              src="/assets/eth.svg"
            />

            <Text paddingLeft=".2rem" color={"white"}>
              ETH
            </Text>
          </HStack>
          <NumberInput
            key="index"
            color="white"
            defaultValue=""
            placeholder="0"
            step={0.00001}
            max={10000}
            min={0}
            precision={5}
            value={ethAmount}
            onChange={handleEthInput}
            paddingLeft="1rem"
            width="200px"
          >
            <NumberInputField />
          </NumberInput>
        </HStack>
        {wethData?.value && (
          <HStack width="350px" padding="1rem" justifyContent="space-between">
            <HStack>
              <Box
                width={50}
                height={50}
                display="flex"
                justifyContent="center"
                alignItems="center"
                border="2px solid rgba(255,255,255,.5)"
                borderRadius="50%"
              >
                <Image
                  alt="ethereum logo"
                  width={38}
                  height={38}
                  src="/assets/weth.svg"
                />
              </Box>
              <Text paddingLeft=".2rem" color={"white"}>
                WETH
              </Text>
            </HStack>
            <NumberInput
              key="index"
              color="white"
              defaultValue=""
              placeholder="0"
              step={0.00001}
              max={10000}
              min={0}
              precision={5}
              value={wethAmount}
              onChange={handleWethInput}
              paddingLeft="1rem"
              width="200px"
            >
              <NumberInputField />
            </NumberInput>
          </HStack>
        )}
        {errorMessage && <Text color="rgba(196,77,86, 1)">{errorMessage}</Text>}
      </VStack>
    </>
  );
};

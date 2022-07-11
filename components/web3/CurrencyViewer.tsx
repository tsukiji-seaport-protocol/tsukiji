import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";

interface CurrencyViewerProps {
  isWETH: boolean;
  currencyAmount: string;
  handleCurrencyInput: (value: string) => void;
  errorMessage: string;
}

export const CurrencyViewer = ({
  isWETH,
  currencyAmount,
  handleCurrencyInput,
  errorMessage,
}: CurrencyViewerProps) => {
  return (
    <>
      <VStack maxHeight={"60vh"}>
        <HStack width="350px" padding="1rem" justifyContent="space-between">
          {!isWETH ? (
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
          ) : (
            <HStack>
              <Image
                alt="wrapped ethereum logo"
                width={50}
                height={50}
                src="/assets/weth.png"
                borderRadius="100%"
              />
              <Text paddingLeft=".2rem" color={"white"}>
                WETH
              </Text>
            </HStack>
          )}
          <NumberInput
            key="index"
            color="white"
            defaultValue=""
            placeholder="0"
            step={0.00001}
            max={10000}
            min={0}
            precision={5}
            value={currencyAmount}
            onChange={handleCurrencyInput}
            paddingLeft="1rem"
            width="200px"
          >
            <NumberInputField />
          </NumberInput>
        </HStack>
        {errorMessage && <Text color="rgba(196,77,86, 1)">{errorMessage}</Text>}
      </VStack>
    </>
  );
};

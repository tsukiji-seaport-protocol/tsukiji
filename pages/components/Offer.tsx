import { Stack, Select, Box, Button, SimpleGrid, HStack, NumberInputField, NumberInput, Flex, Spacer } from '@chakra-ui/react'
import { MouseEventHandler } from 'react';
import { useAccount } from 'wagmi';
import { ConsiderationInput, OfferInput } from './TokenInput';

interface OfferProps {
  createSeaportOrder: MouseEventHandler;
  offerItems: any;
  setOfferItems: any;
  considerationItems: any;
  setConsiderationItems: any;
}

export const Offer = ({ createSeaportOrder, offerItems, setOfferItems, considerationItems, setConsiderationItems }: OfferProps) => {
  const { data: accountData } = useAccount();

  return (
    <>
      <Stack width={'80vw'} maxWidth='1000px' border={1} gap={4}>
        <SimpleGrid columns={[1, 2, 2]} spacing="40px">
          <Box>
            <OfferInput
              setItems={setOfferItems}
              items={offerItems}
              isOffer
            ></OfferInput>
          </Box>
          <Box>
            <ConsiderationInput
              setItems={setConsiderationItems}
              items={considerationItems}
            ></ConsiderationInput>
          </Box>
        </SimpleGrid>
        <Flex gap={4} alignContent="space-between">
          <HStack>
            <Select placeholder='Duration'>
              <option value="24">1 day</option>
              <option value="72">3 days</option>
              <option value="168">7 days</option>
              <option value="720">1 month</option>
            </Select>
            <NumberInput step={5} defaultValue={15} min={10} max={30}>
              <NumberInputField />
            </NumberInput>
          </HStack>
          <Spacer />
          <Button colorScheme='blue' onClick={createSeaportOrder} disabled={!accountData?.address}>
            Create Listing
          </Button>
        </Flex>
      </Stack>
    </>
  )
}
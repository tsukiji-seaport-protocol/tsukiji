import { Stack, Select, Box, Button, SimpleGrid } from '@chakra-ui/react'
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
      <Stack width={'80vw'}>
        <SimpleGrid columns={[1, 2, 2]} spacing="40px">
          <Box px={3}>
            <OfferInput
              title={"OFFER"}
              setItems={setOfferItems}
              items={offerItems}
              isOffer
            ></OfferInput>
            <Select placeholder='1 day'>
              <option value="24">1 day</option>
              <option value="72">3 days</option>
              <option value="168">7 days</option>
              <option value="720">1 month</option>
            </Select>
          </Box>
          <Box px={3}>
            <ConsiderationInput
              title={"CONSIDERATION"}
              setItems={setConsiderationItems}
              items={considerationItems}
            ></ConsiderationInput>
          </Box>
        </SimpleGrid>
        <Button colorScheme='blue' onClick={createSeaportOrder} disabled={!accountData?.address}>
          Create Order
        </Button>
      </Stack>
    </>
  )
}
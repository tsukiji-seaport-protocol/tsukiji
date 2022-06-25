import { ConsiderationInputItem, CreateInputItem } from "@opensea/seaport-js/lib/types";
import { Button, Flex, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { NFTViewer } from "./web3/NFTViewer";
import { useState } from "react";
import { ERC20Viewer } from "./web3/ERC20Viewer";
import { ERC20Amount } from "types/tokenTypes";

type InputItem = CreateInputItem | ConsiderationInputItem;

type ItemsListProps = {
  items: InputItem[];
};

const ItemsList = ({ items }: ItemsListProps) => {
  //  add filtering and categorizing tokens
  return (
    <></>
  );
};

interface TokenSelectionProps {
  isOffer: boolean;
  setItems: (
    value: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  items: InputItem[];
}

const TokenSelection = ({ setItems, items }: TokenSelectionProps) => {
  const { isOpen, onOpen: openAddTokenModal, onClose: closeAddTokenModal } = useDisclosure();
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [eth, setETH] = useState<ERC20Amount>({ address: '', name: ' eth', amount: '0' });

  const addNewToken = () => {
    closeAddTokenModal();
    console.log(selectedTokens, eth);
    setItems((prevState: InputItem[]) => {
      return [...prevState];
    });
  };

  return (
    <>
      <HStack>
        <IconButton aria-label='add token' icon={<AddIcon />} onClick={openAddTokenModal} />
        <Button variant='' onClick={openAddTokenModal}>
          Add Assets
        </Button>
      </HStack>
      <ItemsList items={items} />
      {/* Popup Modal */}
      <Modal isOpen={isOpen} size="5xl" onClose={closeAddTokenModal} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant='soft-rounded' isFitted>
              <TabList>
                <Tab>ERC721</Tab>
                <Tab>ERC20</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <NFTViewer {...{ selectedTokens, setSelectedTokens }} />
                </TabPanel>
                <TabPanel>
                  <ERC20Viewer {...{ eth, setETH }} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter width={'100%'} alignContent='space-between'>
            <Text px={3} fontStyle='italic'>{selectedTokens.length} NFTs selected</Text>
            <Button colorScheme='blue' mr={3} onClick={addNewToken} pl={4}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export {
  TokenSelection
};
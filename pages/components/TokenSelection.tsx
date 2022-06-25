import { ConsiderationInputItem, CreateInputItem } from "@opensea/seaport-js/lib/types";
import { Button, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure, VStack } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { NFTViewer } from "./web3/NFTViewer";

type InputItem = CreateInputItem | ConsiderationInputItem;

type ItemsListProps = {
  items: CreateInputItem[];
  isOffer: boolean;
};

const ItemsList = ({ items, isOffer }: ItemsListProps) => {
  //  add filtering and categorizing tokens
  return (
    <VStack>
      {items.map((item, idx) => (
        <ItemRow key={idx} item={item} isOffer={isOffer} />
      ))}
    </VStack>
  );
};

type ItemRowProps = {
  item: CreateInputItem;
  isOffer: boolean;
};

const ItemRow = ({ isOffer }: ItemRowProps) => {
  return (
    <div style={{ display: "flex" }}>
      {!isOffer ? <TokenAddressInput /> : <DropdownSelect />}
      <QuantityInput />
      {!isOffer && <RecipientInput />}
    </div>
  );
};

const DropdownSelect = () => {
  return (
    <Select placeholder='Token'>
      <option value="24">1 day</option>
      <option value="72">3 days</option>
      <option value="168">7 days</option>
      <option value="720">1 month</option>
    </Select>
  );
};

const TokenAddressInput = () => {
  return (
    <div>
      <label>
        Token Address:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </div>
  );
};

const QuantityInput = () => {
  return (
    <div>
      <label>
        Quantity:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </div>
  );
};

const RecipientInput = () => {
  return (
    <div>
      <label>
        Recipient:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </div>
  );
};

interface TokenSelectionProps {
  isOffer: boolean;
  setItems: (
    value: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  items: InputItem[];
}

const TokenSelection = ({ isOffer, setItems, items }: TokenSelectionProps) => {
  const { isOpen, onOpen: openAddTokenModal, onClose: closeAddTokenModal } = useDisclosure();

  const addNewToken = () => {
    closeAddTokenModal();
    setItems((prevState: InputItem[]) => {
      return [...prevState];
    });
  };

  return (
    <>
      <HStack>
        <IconButton aria-label='add token' icon={<AddIcon />} onClick={addNewToken} />
        <Button variant='' onClick={openAddTokenModal}>
          Add Token
        </Button>
      </HStack>
      <ItemsList items={items} isOffer={isOffer} />
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
                  <NFTViewer />
                </TabPanel>
                <TabPanel>
                  <p>wow whale</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={addNewToken}>
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
import { Button, HStack, IconButton, Select, Stack, VStack } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import {
  ConsiderationInputItem,
  CreateInputItem,
} from "@opensea/seaport-js/lib/types";

type InputItem = CreateInputItem | ConsiderationInputItem;

type TokenInputProps = {
  title: string;
  setItems: (
    value: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  items: InputItem[];
  isOffer?: boolean;
};

// exported offer input
const OfferInput = ({ items, setItems }: TokenInputProps) => {
  return (
    <Stack>
      <h1>Offer</h1>
      <AddTokenButton setItems={setItems}></AddTokenButton>
      <ItemsList items={items} isOffer />
    </Stack>
  );
};

const ConsiderationInput = ({ items, setItems }: TokenInputProps) => {
  return (
    <Stack>
      <h1>In Exchange For</h1>
      <AddTokenButton setItems={setItems}></AddTokenButton>
      <ItemsList items={items} isOffer={false} />
    </Stack>
  );
};

type AddTokenButtonProps = {
  setItems: (
    value: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
};

const AddTokenButton = ({ setItems }: AddTokenButtonProps) => {
  const addNewToken = () => {
    setItems((prevState: InputItem[]) => {
      return [...prevState];
    });
  };

  return (
    <HStack>
      <IconButton aria-label='Search database' icon={<AddIcon />} onClick={addNewToken} />
      <Button variant='' onClick={addNewToken}>
        Add Token
      </Button>
    </HStack>
  );
};

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
      {!isOffer ? <TokenAddressInput /> : <TokenSelection />}
      <QuantityInput />
      {!isOffer && <RecipientInput />}
    </div>
  );
};

const TokenSelection = () => {
  return (
    <Select placeholder='1 day'>
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

export {
  ConsiderationInput,
  OfferInput
}
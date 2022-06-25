import { Stack } from "@chakra-ui/react";
import {
  ConsiderationInputItem,
  CreateInputItem,
} from "@opensea/seaport-js/lib/types";
import styles from '@styles/TokenInput.module.css';
import { TokenSelection } from "./TokenSelection";

type InputItem = CreateInputItem | ConsiderationInputItem;

type TokenInputProps = {
  setItems: (
    value: InputItem[] | ((prevState: InputItem[]) => InputItem[])
  ) => void;
  items: InputItem[];
  isOffer?: boolean;
};

// exported offer input
const OfferInput = ({ items, setItems }: TokenInputProps) => {
  return (
    <Stack gap={2} borderWidth='1px' borderRadius='lg' padding={5}>
      <h1 className={styles.title}>Offer</h1>
      <TokenSelection {...{ setItems, items, isOffer: true }} />
    </Stack>
  );
};

const ConsiderationInput = ({ items, setItems }: TokenInputProps) => {
  return (
    <Stack gap={2} borderWidth='1px' borderRadius='lg' padding={5}>
      <h1 className={styles.title}>In Exchange For</h1>
      <TokenSelection {...{ setItems, items, isOffer: false }} />
    </Stack>
  );
};

export {
  ConsiderationInput,
  OfferInput
}
import {
  ConsiderationInputItem,
  CreateInputItem,
} from "@opensea/seaport-js/lib/types";

export interface ERC20Amount {
  address: string;
  name: string;
  amount: string;
}

export type InputItem = OfferItem | ConsiderationItem;

export type OfferItem = {
  inputItem: CreateInputItem;
  name: string;
  image_url: string;
  token_id: string;
  address: string;
};

export type ConsiderationItem = {
  inputItem: ConsiderationInputItem;
  name: string;
  image_url: string;
  token_id: string;
  address: string;
};

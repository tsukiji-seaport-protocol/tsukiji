import { ItemType, OrderType } from "@opensea/seaport-js/lib/constants";
import {
  ConsiderationInputItem,
  CreateInputItem,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { BigNumberish } from "ethers";

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
  collectionName: string;
  symbol: string;
};

export type ConsiderationItem = {
  inputItem: ConsiderationInputItem;
  name: string;
  image_url: string;
  token_id: string;
  address: string;
  collectionName: string;
  symbol: string;
};

export type OrderWithMetadata = {
  order: OrderWithCounter;
  offers: OfferItem[];
  considerations: ConsiderationItem[];
};

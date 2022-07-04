import { ItemType } from "@opensea/seaport-js/lib/constants";
import {
  ConsiderationInputItem,
  CreateInputItem,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";

export type InputItem = OfferItem | ConsiderationItem;

export type OfferItem = {
  type: ItemType;
  inputItem: CreateInputItem;
  name: string;
  image_url: string;
  token_id: string;
  address?: string;
  collectionName: string;
  symbol: string;
};

export type ConsiderationItem = {
  type: ItemType;
  inputItem: ConsiderationInputItem;
  name: string;
  image_url: string;
  token_id: string;
  address?: string;
  collectionName: string;
  symbol: string;
};

export type OrderWithMetadata = {
  id: string;
  order: OrderWithCounter;
  offers: OfferItem[];
  considerations: ConsiderationItem[];
};

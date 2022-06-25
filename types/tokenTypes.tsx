import { ConsiderationInputItem, CreateInputItem } from "@opensea/seaport-js/lib/types";

export interface ERC20Amount {
  address: string;
  name: string;
  amount: string;
}

export type InputItem = CreateInputItem | ConsiderationInputItem;

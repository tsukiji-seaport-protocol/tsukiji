import { ItemType } from "@opensea/seaport-js/lib/constants";
import { OfferItem, ConsiderationItem } from "types/tokenTypes";
import { CurrencyItem, CreateInputItem } from "@opensea/seaport-js/lib/types";

export const createOfferItem = (
  type: ItemType,
  name: string,
  imageUrl: string,
  symbol: string,
  amount: string,
  contractAddress?: string,
  collectionName: string = "",
  tokenId: string = ""
): OfferItem => {
  let inputItem: CreateInputItem;
  if (type !== ItemType.ERC721) {
    inputItem = {
      token: contractAddress ?? undefined,
      amount,
    } as CurrencyItem;
  } else {
    inputItem = {
      itemType: type,
      token: contractAddress,
      identifier: tokenId,
    };
  }
  return {
    type,
    inputItem,
    name,
    collectionName,
    image_url: imageUrl,
    token_id: tokenId,
    address: contractAddress,
    symbol: symbol,
  };
};

export const createConsiderationItem = (
  type: ItemType,
  name: string,
  imageUrl: string,
  symbol: string,
  amount: string,
  recipient: string,
  contractAddress?: string,
  collectionName: string = "",
  tokenId: string = ""
): ConsiderationItem => {
  let inputItem: CreateInputItem;
  if (type !== ItemType.ERC721) {
    inputItem = {
      token: contractAddress,
      amount,
    } as CurrencyItem;
  } else {
    inputItem = {
      itemType: type,
      token: contractAddress,
      identifier: tokenId,
      recipient,
    };
  }
  return {
    type,
    inputItem,
    name,
    collectionName,
    image_url: imageUrl,
    token_id: tokenId,
    address: contractAddress,
    symbol: symbol,
  };
};

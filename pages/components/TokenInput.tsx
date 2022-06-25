import { Dispatch, SetStateAction, useState } from "react";
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

const TokenInput = ({ title, items, setItems, isOffer }: TokenInputProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>{title}</h1>
      <AddTokenButton setItems={setItems}></AddTokenButton>
      <ItemsList items={items} isOffer />
    </div>
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
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          border: "none",
        }}
        onClick={addNewToken}
      >
        <div>+</div>
      </button>
      <div
        style={{
          marginLeft: ".5rem",
        }}
      >
        Add Token
      </div>
    </div>
  );
};

type ItemsListProps = {
  items: CreateInputItem[];
  isOffer: boolean;
};

const ItemsList = ({ items, isOffer }: ItemsListProps) => {
  //  add filtering and categorizing tokens
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, idx) => (
        <ItemRow key={idx} item={item} isOffer />
      ))}
    </div>
  );
};

type ItemRowProps = {
  item: CreateInputItem;
  isOffer: boolean;
};

const ItemRow = ({ item, isOffer }: ItemRowProps) => {
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
    <div>
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>
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

export default TokenInput;

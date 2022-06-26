import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  CreateOrderInput,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { Seaport } from "@opensea/seaport-js";
import { useAccount } from "wagmi";
import { providers } from "ethers";
import { useCallback, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { OrderPage } from "./components/OrderPage";
import { Stack } from "@chakra-ui/react";
import { OfferItem, ConsiderationItem } from "types/tokenTypes";
import { NavBar } from "./components/NavBar";
import { ListingCard } from "./components/ListingCard";
import { SimpleGrid } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { data: accountData, isError, isLoading } = useAccount();

  const [order, setOrder] = useState<OrderWithCounter>();

  const [offerItems, setOfferItems] = useState<OfferItem[]>([]);

  const [considerationItems, setConsiderationItems] = useState<
    ConsiderationItem[]
  >([]);

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  const [listings, setListings] = useState([0, 0, 0, 0]);

  return (
    <div className={styles.container}>
      <NavBar></NavBar>
      <main className={styles.main}>
        <div className={styles.header}>RECOMMENDED LISTINGS</div>
        <div>
          <SimpleGrid columns={2} spacing={10}>
            {listings.map((listing, idx) => (
              <ListingCard key={idx} />
            ))}
          </SimpleGrid>
        </div>
      </main>
    </div>
  );
};

export default Home;

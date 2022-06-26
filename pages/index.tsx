import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  CreateOrderInput,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { useAccount } from "wagmi";
import { providers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { OfferItem, ConsiderationItem } from "types/tokenTypes";
import { NavBar } from "../components/NavBar";
import { ListingCard } from "../components/ListingCard";
import { SimpleGrid } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { data: accountData, isError, isLoading } = useAccount();

  const [aliceOrder, setAliceOrder] = useState<OrderWithCounter>();

  const [order, setOrder] = useState<OrderWithCounter>();

  const [offerItems, setOfferItems] = useState<OfferItem[]>([]);

  const [considerationItems, setConsiderationItems] = useState<
    ConsiderationItem[]
  >([]);

  const ethersProvider = new providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     console.log("here?");
  //     try {
  //       const response = await fetch(
  //         `/api/relatedOrders/${accountData?.address}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       console.log("data: ", data);
  //       setRelatedOrders(data);
  //     } catch (err) {
  //       console.log("Error request: ", err);
  //     }
  //   };
  //   fetchOrders();
  // }, [accountData?.address]);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("here?");
      try {
        const response = await fetch(`/api/orders`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();

        const aliceData = data.find(
          (item: any) =>
            item?.parameters.offerer ===
            "0x439440B818Cac3380aB2d9923F45b675BbA0CB18"
        );

        console.log(JSON.stringify(aliceData));
        setAliceOrder(aliceData);
      } catch (err) {
        console.log("Error request: ", err);
      }
    };
    fetchOrders();
  }, [accountData?.address]);

  const [listings, setListings] = useState([0, 0, 0, 0]);

  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.header}>WELCOME TO TSUKIJI</div>
        <div>
          <SimpleGrid columns={2} spacing={10}>
            {aliceOrder && (
              <ListingCard listing={aliceOrder} key="alice" isAlice={true} />
            )}
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

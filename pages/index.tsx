import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { ListingCard } from "../components/ListingCard";
import { Button, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: accountData } = useAccount();

  const [aliceOrder, setAliceOrder] = useState<OrderWithCounter>();

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
        <Link href="/create">
          <Button>
            Create Listing
          </Button>
        </Link>
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

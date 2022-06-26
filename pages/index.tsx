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

  const [relatedOrders, setRelatedOrders] = useState<OrderWithCounter[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("here?");
      try {
        const response = await fetch(
          `/api/relatedOrders/${accountData?.address}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("data: ", data);
        setRelatedOrders(data);
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
        <div className={styles.header}>
          RECOMMENDED LISTINGS
        </div>
        <Link href="/create">
          <Button>
            Create Listing
          </Button>
        </Link>
        <div>
          <SimpleGrid columns={[1, 2]} spacing={10} pt={4}>
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
